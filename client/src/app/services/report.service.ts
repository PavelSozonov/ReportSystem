import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { List } from 'lodash';

import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Report, NewReport } from '../core/report';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private readonly httpService: HttpService,
        private readonly loggerService: LoggerService,
        private readonly authService: AuthService) {
    }

    public async getReports(): Promise<List<Report>> {
        try {
            return await this.httpService.getReports(this.authService.userName, this.authService.userEntity);
            /* if (reports.length) {
                this.reports = reports;
            } else {
                this.loggerService.success('You have not any reports!');
            } */
        } catch (err) {
            this.loggerService.error('Report list was not loaded');
            return null;
        }
    }

    public async getTags(reportId: number): Promise<List<string>> {
        try {
            return await this.httpService.getReportTags(reportId);
        } catch (err) {
            this.loggerService.error('Tag list was not loaded');
            return null;
        }
    }

    public async createReport(title: string, description: string, tags: string[]): Promise<number> {
        try {
            const newReport: NewReport = {
                title: title,
                description: description,
                sender: this.authService.userName,
                tags: tags
            };
            const reportId = await this.httpService.createReport(newReport);
            if (reportId) {
                this.loggerService.success('Report successfully submitted!');
            } else {
                this.loggerService.error('Report was not be submitted');
            }
            return reportId;
        } catch (err) {
            this.loggerService.error('Report was not be submitted');
            return null;
        }
    }

    public async changeStatus(reportId: number, status: string): Promise<boolean> {
        try {
            await this.httpService.changeReportStatus(reportId, Report.toStatusNumber(status));
            this.loggerService.success('Report status successfully updated!');
            return true;
        } catch (err) {
            this.loggerService.error('Report status was not be updated');
            return false;
        }
    }
}
