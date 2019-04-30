import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../core/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    private readonly baseUrl = 'http://localhost:8080';

    constructor(private readonly http: HttpClient) {
    }

    public getUser(username: string, password: string): Promise<User> {
        return <Promise<User>>this.http.get(`${this.baseUrl}/users/${username}`, {headers: this.headers}).toPromise();
    }
}
