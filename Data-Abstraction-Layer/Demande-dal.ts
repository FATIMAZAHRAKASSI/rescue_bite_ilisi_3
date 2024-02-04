import { urlencoded } from 'express';
import MySQLConnection from './SQLConnection';
import DatabaseAbstractionLayer from './dal-interface';
import { json } from 'sequelize';

export default class DemandeDal implements DatabaseAbstractionLayer {
    private mysqlConnection: MySQLConnection;


    constructor() {
        this.mysqlConnection = new MySQLConnection();
    };


    async connect() {
        try {
            const connection = await this.mysqlConnection.getConnection();
            console.log('Connected to MySQL');
            connection.release();
        } catch (error) {
            console.error('Error connecting to MySQL:', error);
            throw error;
        }
    }

    async create(entityName: string, data: any): Promise<any> {
        try {
            await this.connect();
            console.log("here's ur demande"+JSON.stringify(data));
            // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult : any = await this.mysqlConnection.executeQuery(
                    'INSERT INTO demande (id_signal, id_organisation, statutdemande) VALUES (?, ?, ?)',
                    [data.id_signal, data.id_organisation, 'En_attente']
                );
               if (userResult!=null) {
                console.log("user result "+userResult);
                return userResult;
            } else {
                // Handle other entity creation logic if needed
                throw new Error('Creation demande a echoué');
            }
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }

    async update(entityName: string, id: any, data: any): Promise<any> {
        // Implement your update logic here
        try {
            await this.connect();
            console.log("here's ur demande"+JSON.stringify(data));
            // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult : any = await this.mysqlConnection.executeQuery(
                    'UPDATE  demande SET  id_signal=?, id_organisation=?, statutdemande=? where id_demande=?',
                    [data.id_signal, data.id_organisation, data.statutdemande,id]
                    
                );

               if (userResult!=null) {
                return userResult;
            } else {
                // Handle other entity creation logic if needed
                throw new Error('Creation demande a echoué');
            }
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }

    async get(entityName: string, id: any): Promise<any> {
        try {
        
            await this.connect();
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from demande
            where demande.id_demande=?`,
            [id]
        );
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }

    }


    delete(entityName: string, id: any): Promise<boolean> {
        // Implement your delete logic here
        throw new Error('Method not implemented.');
    }

    async findAll(entityName: string): Promise<any[]> {
        try {
        
            await this.connect();
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from demande`,null
        );
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }

    async findByFilter(entityName: string, filter: any): Promise<any[]> {
        try {
        
            await this.connect();
            
            console.log("here's id"+JSON.stringify(filter.id_signal))
            let id=filter.id_signal
            let iddemande=parseInt(entityName)
        const userResult : any = await this.mysqlConnection.executeQuery(
            `UPDATE demande SET statutdemande =? where id_demande !=? and id_signal=?`,
            ['Refuse',iddemande,id]
        );
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }
//les organsations qui ont postuer pour cet signal
    async findByFilter2(entityName: string, filter: any): Promise<any[]> {
        try {
        
            await this.connect();
            
            console.log("here's id"+JSON.stringify(filter.id_signal))
            let id=filter.id_signal
            let iddemande=parseInt(entityName)
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from demande,organisation,utilisateur where id_signal=?
            and demande.id_organisation=organisation.id_utilisateur
            and organisation.id_utilisateur=utilisateur.id_utilisateur`,
            [id]
        );
        console.log(JSON.stringify("youre ueser ersult demande "+userResult))
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }

    async findByFilter3(entityName: string, filter: any): Promise<any[]> {
        try {
        
            await this.connect();
            
            console.log("here's id"+JSON.stringify(filter.id_organisation))
            let id=filter.id_organisation
            let iddemande=parseInt(entityName)
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from demande,my_signal where 
            demande.id_signal=my_signal.id_signal and 
            id_organisation=? And statutdemande=?`,
            [id,"Accepte"]
        );
        console.log(JSON.stringify("youre ueser ersult demande "+userResult))
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }
}
