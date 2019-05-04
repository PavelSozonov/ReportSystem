export interface ReportView {
    number: string;
    title: string;
    status: string;
}

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

    public static toView(report: Report): ReportView {
        return {number: report.number, title: report.title, status: Status[report.status]};
    }
}

export enum Status {
    'New',
    'Sent',
    'Received',
    'In progress',
    'Solved',
    'Declined'
}
