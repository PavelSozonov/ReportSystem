import { Status } from './report';

export class ReportHistory {
    public status: Status;
    private changeDate: number;

    constructor() {}

    public static toView(history: ReportHistory): HistoryView {
        return {
            status: ReportHistory.getStatusString(history),
            changeDate: ReportHistory.getChangeDateString(history)
        };
    }

    public static getChangeDate(history: ReportHistory): Date {
        return new Date(history.changeDate);
    }

    public static getChangeDateString(history: ReportHistory): string {
        return ReportHistory.getChangeDate(history).toUTCString();
    }

    public static getStatusString(history: ReportHistory): string {
        return Status[history.status];
    }
}

export interface HistoryView {
    status: string;
    changeDate: string;
}
