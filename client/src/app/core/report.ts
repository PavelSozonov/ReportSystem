export class Report {
    constructor(
        public id: number,
        public title: string,
        public description: string, // 600 chars
        public sender: string,
        public recipient: string,
        public status: Status,
        private _changeDate: number,
        public number: string
    ) {}

    public get changeDate(): Date {
       return new Date(this._changeDate);
    }

    public get changeDataString(): string {
        return this.changeDate.toUTCString();
    }

    public static toView(report: Report): ReportView {
        return {
            number: report.number,
            title: report.title,
            status: Status[report.status],
            recipient: report.recipient,
            sender: report.sender
        };
    }
}

export interface ReportView {
    number: string;
    title: string;
    status: string;
    recipient: string;
    sender: string;
}


export enum Status {
    'New',
    'Sent',
    'Received',
    'In progress',
    'Solved',
    'Declined'
}
