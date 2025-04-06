
export enum TaskEstado {
    ABIERTA,
    TERMINADA
}

export default class Task {
    constructor(
        public titulo?: string,
        public descripcion?: string,
        public estado?: TaskEstado,
        public id?: number,
    ) {}
}