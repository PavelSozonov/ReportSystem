import * as _ from 'lodash';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'lodash';

import { User } from '../core/user';
import { Report, NewReport, Status } from '../core/report';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    private readonly baseUrl = 'http://localhost:8080';

    constructor(private readonly http: HttpClient) {
    }

    public getUser(username: string): Promise<User> {
        return <Promise<User>>this.http.get(`${this.baseUrl}/users/${username}`, {
            headers: this.headers
        }).toPromise();
    }

    public getReports(username: string, entity?: string): Promise<List<Report>> {
        return <Promise<List<Report>>>this.http.get(`${this.baseUrl}/reports/${username}/${entity}`, {
            headers: this.headers
        }).toPromise();
    }

    public getTags(): Promise<string[]> {
        return <Promise<string[]>>this.http.get(`${this.baseUrl}/tags/`, {
            headers: this.headers
        }).toPromise();
    }

    public getReportTags(reportId: number): Promise<string[]> {
        return <Promise<string[]>>this.http.get(`${this.baseUrl}/reports/${reportId}/tags/`, {
            headers: this.headers
        }).toPromise();
    }

    public createReport(report: NewReport): Promise<number> {
        const params = JSON.stringify(report);
        return <Promise<number>>this.http.post(`${this.baseUrl}/reports/`, {
            headers: this.headers,
            params: params
        }).toPromise();
    }

    public changeReportStatus(reportId: number, status: number): Promise<boolean> {
        const params = JSON.stringify({id: reportId, status: status});
        return <Promise<boolean>>this.http.put(`${this.baseUrl}/reports/status`, {
            headers: this.headers,
            params: params
        }).toPromise();
    }
}
