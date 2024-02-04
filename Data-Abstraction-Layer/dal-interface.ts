export default interface DatabaseAbstractionLayer {
    findByFilter3(nomEntity: string, filter: any): Promise<any[]>;
    findByFilter2(nomEntity: string, filter: any): Promise<any[]>;
    create(entityName: string,data: any): Promise<any>;
    update(entityName: string,id: any, data: any): Promise<any>;
    get(entityName: string,id: any): Promise<any>;
    delete(entityName: string,id: any): Promise<boolean>;
    findAll(entityName: string): Promise<any[]>;
    findByFilter(entityName: string,filter: any): Promise<any[]>;
}
