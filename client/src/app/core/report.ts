export class Report {
    constructor(
        public id: number,
        public title: string,
        public description: string, // 600 chars
        public sender: string,
        public recipient: string,
        public status: Status,
        public changeDate: number, // TODO: change to timestamp
        public number: string
    ) {}
}

export enum Status {
    NEW,
    SENT,
    RECEIVED,
    IN_PROGRESS,
    SOLVED,
    DECLINED
}
