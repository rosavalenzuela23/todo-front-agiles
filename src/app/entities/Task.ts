import IdAutoIncrement from "../utilities/IdAutoIncrement";

export enum TaskEstado {
    ABIERTA,
    TERMINADA
}

export enum Status {
    PENDIENTE = 'pendiente',
    EN_PROGRESO = 'en_progreso',
    COMPLETADA = 'completada',
}
export type TaskServerObject = {
    title: string;
    description?: string;
    status?: Status;
    categoryName?: string;
    endDate?: Date;
}

export default class Task {
    constructor(
        public titulo?: string,
        public descripcion?: string,
        public fechaTermino?: string,
        public estado?: TaskEstado,
        public nombreLista?: string,
        public idPropio?: number,
    ) {
        this.estado = TaskEstado.ABIERTA;
    }

    static toServerObject(task: Task): TaskServerObject {
        return {
            title: task.titulo!,
            description: task.descripcion,
            status: task.estado === TaskEstado.ABIERTA ? Status.PENDIENTE : Status.COMPLETADA,
            categoryName: task.nombreLista,
            endDate: task.fechaTermino ? new Date(task.fechaTermino) : undefined,
        }
    }

    static fromServerObject(task: TaskServerObject): Task {
        return new Task(
            task.title,
            task.description,
            task.endDate?.toString(),
            task.status === Status.PENDIENTE ? TaskEstado.ABIERTA : TaskEstado.TERMINADA,
            task.categoryName
        )
    }

    static toServerObjectArray(tasks: Task[]): TaskServerObject[] {
        return tasks.map(task => Task.toServerObject(task));
    }

}