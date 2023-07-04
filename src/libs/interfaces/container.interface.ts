export interface ContainerInterface<T> {
    register(key: string, value: any): void;
    resolve(key: string, value: T): T;
}