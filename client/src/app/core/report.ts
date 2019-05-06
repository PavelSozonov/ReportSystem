export class Report {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public sender: string,
        public recipient: string,
        public status: Status,
        private changeDate: number,
        public number: string
    ) {}

    public static toView(report: Report): ReportView {
        return {
            number: report.number,
            title: report.title,
            status: Report.getStatusString(report),
            recipient: report.recipient,
            sender: report.sender
        };
    }

    public static getChangeDate(report: Report): Date {
       return new Date(report.changeDate);
    }

    public static getChangeDateString(report: Report): string {
        return Report.getChangeDate(report).toUTCString();
    }

    public static getStatusString(report: Report): string {
        return Status[report.status];
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
