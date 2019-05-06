import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Report, NewReport } from '../core/report';
import { List } from 'lodash';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    private reports: List<Report>;

    constructor(private readonly httpService: HttpService,
        private readonly loggerService: LoggerService,
        private readonly authService: AuthService) {
            this.reports = null;
    }

    public async getReports(): Promise<List<Report>> {
        try {
            const reports = await this.httpService.getReports(this.authService.userName, this.authService.userEntity);
            /* if (reports.length) {
                this.reports = reports;
            } else {
                this.loggerService.success('You have not any reports!');
            } */
            return reports;
        } catch (err) {
            this.loggerService.error(`ERROR: ${err}`);
            return null;
        }
    }

    public async getTags(reportId: number): Promise<List<string>> {
        try {
            return await this.httpService.getReportTags(reportId);
        } catch (err) {
            this.loggerService.error(`ERROR: ${err}`);
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
            return await this.httpService.createReport(newReport);
        } catch (err) {
            this.loggerService.error(`ERROR: ${err}`);
            return null;
        }
    }
}
