export interface CrudModel<T> {
    create(data: any): Promise<string>;
    getById(id: string): Promise<T>;
    list(options?: any): Promise<T[]>;
    del(id: string): Promise<string>;
    update(id: string, data: any): Promise<T>;
}