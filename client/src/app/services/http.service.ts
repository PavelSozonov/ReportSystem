import * as _ from 'lodash';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../core/user';
import { Report } from '../core/report';
import { List } from 'lodash';

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
        const params = new HttpParams();
        if (entity) {
            params.append('entity', entity);
        }
        return <Promise<List<Report>>>this.http.get(`${this.baseUrl}/reports/${username}`, {
            headers: this.headers, params: params
        }).toPromise();
    }
}
