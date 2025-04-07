export default function IdAutoIncrement<T extends new (...args: any[]) => any>(ctr: T): T {
    let id = 0;
    return class {
        constructor(...args: any[]) {
            id++;
            let instancia = new ctr(...args);
            instancia.id = id;
            return instancia;
        }
    } as T
}