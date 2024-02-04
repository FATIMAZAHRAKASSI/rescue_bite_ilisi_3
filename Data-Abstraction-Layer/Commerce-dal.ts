import MySQLConnection from './SQLConnection';
import DatabaseAbstractionLayer from './dal-interface';

export default class CommerceDal implements DatabaseAbstractionLayer {
    private mysqlConnection: MySQLConnection;


    constructor() {
        this.mysqlConnection = new MySQLConnection();
    }findByFilter2(nomEntity: string, filter: any): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
;
async findByFilter3(entityName: string, filter: any): Promise<any[]> {
    throw new Error('Method not implemented.');

}

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
            console.log(data);
            // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult : any = await this.mysqlConnection.executeQuery(
                    'INSERT INTO utilisateur (description, adresse, email, heure_fermeture, heure_ouverture, logo, mot_de_passe, nom_user, numero_telephone, role_user, id_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [data.description, data.adresse, data.email, data.heure_fermeture, data.heure_ouverture, data.logo, data.mot_de_passe, data.nom, data.numero_telephone, data.role_user, data.id_position]
                );

                // Get the user's ID
               if (userResult!=null) {
                console.log(userResult.insertId);
                const images = data.images;
                for (const key in images) {
                const imageresult:any=await this.mysqlConnection.executeQuery(
                    'INSERT INTO utilisateur_images  (images, utilisateur_id_utilisateur) VALUES (?, ?)',
                    [images[key], userResult.insertId]
                );
                }
                const orgaresult:any=await this.mysqlConnection.executeQuery(
                        'INSERT INTO commerce (type_commerce, id_utilisateur) VALUES (?, ?)',
                        [data.type_commerce, userResult.insertId]
                    );
               return orgaresult;
            } else {
                // Handle other entity creation logic if needed
                throw new Error('Creation user a echoué');
            }
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }



    update(entityName: string, id: any, data: any): Promise<any> {
        // Implement your update logic here
        throw new Error('Method not implemented.');
    }

    async get(entityName: string, id: any): Promise<any> {
        try {
        
            await this.connect();
        const userResult : any = await this.mysqlConnection.executeQuery(
            `select * from utilisateur,commerce
            where utilisateur.id_utilisateur=commerce.id_utilisateur
            AND commerce.id_utilisateur=?`,
            [id]
        );

        const imageResult : any = await this.mysqlConnection.executeQuery(
            `select * from utilisateur_images
            where utilisateur_id_utilisateur=?`,
            [id]
        );
        const transformedJson = imageResult.reduce((acc:any, item:any, index:any) => {
            const imageKey = index.toString();
            acc.images[imageKey] = item.images;
            return acc;
          }, { images: {} });
          const mergedJson = {
            ...userResult[0],
            ...transformedJson
          };
          console.log("your new json"+JSON.stringify(transformedJson));
            console.log("your merged json"+JSON.stringify(mergedJson));
        return mergedJson;
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
            `select * from commerce,utilisateur
            where commerce.id_utilisateur=utilisateur.id_utilisateur`,null
        );
        return userResult;
        }
        catch (error) {
            console.error('Error getting entity:', error);
            throw error;
        }
    }

    async findByFilter(entityName: string, filter: any): Promise<any> {
        try {
            await this.connect();
            console.log(filter);
            const userResult : any = await this.mysqlConnection.executeQuery(
                'SELECT * FROM utilisateur where email=? And mot_de_passe=?',
                [filter.email,filter.mot_de_passe]
            );
            console.log("dadad "+userResult+"dada");
            if(userResult!='')
            {//console.log("your json"+JSON.stringify(userResult[0].id_utilisateur))
            const organisationresult : any = await this.mysqlConnection.executeQuery(
                    'SELECT * FROM  commerce where id_utilisateur = ? ',
                    [userResult[0].id_utilisateur]
                );

                const imagesresult : any = await this.mysqlConnection.executeQuery(
                    'SELECT * FROM  utilisateur_images where utilisateur_id_utilisateur = ? ',
                    [userResult[0].id_utilisateur]
                );
                const parsedData = imagesresult.reduce((jsonObject:any, row:any) => {
                  
                    if (!jsonObject["images"]) {
                      jsonObject["images"] = [];
                    }
                  
                    jsonObject["images"].push( row.images );
                  
                    return jsonObject;
                  }, {});
                  
                  console.log(parsedData);
                const concatenatedValues = {
                    ...userResult[0],
                    ...organisationresult,
                    ...parsedData
                };
                console.log(JSON.stringify(organisationresult));
                return concatenatedValues;
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
