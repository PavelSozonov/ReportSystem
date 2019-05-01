import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Report } from '../core/report';
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

}
