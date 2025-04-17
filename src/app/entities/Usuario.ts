

export default class Usuario {
    constructor(
        public nombre?: string,
        public usuario?: string,
        public email?: string,
        public password?: string,
        public fechaNacimiento?: string,
        public id?: number
    ) {}
}