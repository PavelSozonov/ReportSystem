export class Report {
    public id: number;
    public title: string;
    public description: string;
    public sender: string;
    public recipient: string;
    public status: Status;
    private changeDate: number;
    public number: string;

    constructor() {}

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

    public static toStatusNumber(status: string): number {
        switch (status) {
            case Status[Status.New]: return 0;
            case Status[Status.Sent]: return 1;
            case Status[Status.Received]: return 2;
            case Status[Status['In progress']]: return 3;
            case Status[Status.Solved]: return 4;
            case Status[Status.Declined]: return 5;
        }
    }
}

export interface ReportView {
    number: string;
    title: string;
    status: string;
    recipient: string;
    sender: string;
}

export interface NewReport {
    title: string;
    description: string;
    sender: string;
    tags: string[];
}

export enum Status {
    'New',
    'Sent',
    'Received',
    'In progress',
    'Solved',
    'Declined'
}
