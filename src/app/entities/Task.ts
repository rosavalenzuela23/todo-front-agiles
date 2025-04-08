import IdAutoIncrement from "../utilities/IdAutoIncrement";

export enum TaskEstado {
    ABIERTA,
    TERMINADA
}

export default class Task {
    constructor(
        public titulo?: string,
        public descripcion?: string,
        public fechaTermino?: string,
        public estado?: TaskEstado,
        public nombreLista?: string,
        public id?: number,
    ) {
        this.estado = TaskEstado.ABIERTA;
    }
}