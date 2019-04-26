export class User {
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public password: string,
        public entity: string
    ) {}
}
