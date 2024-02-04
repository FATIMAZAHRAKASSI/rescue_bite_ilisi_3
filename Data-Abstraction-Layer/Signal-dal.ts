import { Json } from 'sequelize/types/utils';
import MySQLConnection from './SQLConnection';
import DatabaseAbstractionLayer from './dal-interface';

export default class SignalDal implements DatabaseAbstractionLayer {
    private mysqlConnection: MySQLConnection;


    constructor() {
        this.mysqlConnection = new MySQLConnection();
    }
    
   async  findByFilter2(nomEntity: string, filter: any): Promise<any[]> {
        try {
        
            await this.connect();
            console.log(filter.id)
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from my_signal where statutsignal=?`,
            ['En_attente']
        );
      /*  userResult.forEach((element: { description: any; }) => {
            const desc=element.description
            element.description=desc
            console.log("desc desc "+element.description)
        });*/
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }
;


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
            console.log("here's ur signal"+data.unit);
            var currentDate = new Date();
            var formattedDate = currentDate.toISOString().slice(0, -1);
            // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult : any = await this.mysqlConnection.executeQuery(
                    'INSERT INTO my_signal (id_commerce, type_nouriture, statutsignal, quantité, image, description_signal,date_expiration,unite) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [data.id_commerce, data.type_nouriture, 'En_attente', data.quantité, data.image, data.description, data.date_expiration,data.unit]
                );

                // Get the user's ID
               if (userResult!=null) {
                return userResult;
            } else {
                // Handle other entity creation logic if needed
                throw new Error('Creation user a echoué');
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
            console.log("here's ur signal"+data);
            // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult : any = await this.mysqlConnection.executeQuery(
                    'UPDATE my_signal SET id_commerce=?, type_nouriture=?, statutsignal=?, quantité=?, image=?, description_signal=?, date_expiration=? ,unite=? where id_signal=?',
                    [data.id_commerce, data.type_nouriture, data.statutsignal, data.quantité, data.image, data.description, data.date_expiration,data.unite,id]
                    
                );

               if (userResult!=null) {
                return userResult;
            } else {
                // Handle other entity creation logic if needed
                throw new Error('update signal a echoué');
            }
        } catch (error) {
            console.error('Error updateing entity:', error);
            throw error;
        }
    }

    async get(entityName: string, id: any): Promise<any> {
        try {
        
            await this.connect();
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from my_signal where id_signal=${id}`,
            [id]
        );
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }

    }
    async findByFilter3(entityName: string, filter: any): Promise<any[]> {
        throw new Error('Method not implemented.');

    }

    delete(entityName: string, id: any): Promise<boolean> {
        // Implement your delete logic here
        throw new Error('Method not implemented.');
    }

    async findAll(entityName: string): Promise<any[]> {
        try {
        
            await this.connect();
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from my_signal`,null
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
            console.log(filter.id)
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from my_signal where id_commerce=?`,
            [filter.id]
        );
      /*  userResult.forEach((element: { description: any; }) => {
            const desc=element.description
            element.description=desc
            console.log("desc desc "+element.description)
        });*/
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }
}
