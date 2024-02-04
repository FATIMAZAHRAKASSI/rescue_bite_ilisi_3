import MySQLConnection from './SQLConnection';
import DatabaseAbstractionLayer from './dal-interface';

export default class admin implements DatabaseAbstractionLayer {
    private mysqlConnection: MySQLConnection;


    constructor() {
        this.mysqlConnection = new MySQLConnection();
    }findByFilter2(nomEntity: string, filter: any): Promise<any[]> {
        throw new Error('Method not implemented.');
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
        throw new Error('Method not implemented.');
    }



    update(entityName: string, id: any, data: any): Promise<any> {
        // Implement your update logic here
        throw new Error('Method not implemented.');
    }

    async get(entityName: string, id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    delete(entityName: string, id: any): Promise<boolean> {
        // Implement your delete logic here
        throw new Error('Method not implemented.');
    }

    async findAll(entityName: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    async findByFilter3(entityName: string, filter: any): Promise<any[]> {
        throw new Error('Method not implemented.');

    }
    async findByFilter(entityName: string, filter: any): Promise<any> {
        try {
            await this.connect();
            console.log(filter);
            const userResult : any = await this.mysqlConnection.executeQuery(
                'SELECT * FROM admin where email=? And password=?',
                [filter.email,filter.mot_de_passe]
            );
            if(userResult!='')
            {//console.log("your json"+JSON.stringify(userResult[0].id_utilisateur))
            
                return userResult;
            }
            else
            {
                return null;
            }
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }
}
