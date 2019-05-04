import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { User } from '../core/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserName: string = null;
    private currentUserEntity?: string = null;

    constructor(private readonly httpService: HttpService,
        private readonly loggerService: LoggerService) {
    }

    public async login(username: string, password: string): Promise<boolean> {
        try {
            const user = await this.httpService.getUser(username);
            if (user.password === password) {
                this.currentUserName = user.code;
                this.currentUserEntity = user.entity;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.loggerService.success('User successfully logged in!');
                return true;
            } else {
                this.loggerService.error('Invalid password!');
                return false;
            }
        } catch (err) {
            this.loggerService.error('User cannot found. Please, try to login again!');
            return false;
        }
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    public loadUser(): void {
        const userInfo: User = JSON.parse(localStorage.getItem('currentUser'));
        if (userInfo) {
            this.currentUserName = userInfo.code;
            this.currentUserEntity = userInfo.entity;
        }
    }

    public isAdmin(): boolean {
        return this.currentUserEntity !== null;
    }

    public logout(): void {
        this.currentUserName = null;
        this.currentUserEntity = null;
        localStorage.removeItem('currentUser');
    }

    public get userName(): string {
        return this.currentUserName;
    }

    public get userEntity(): string {
        return this.currentUserEntity;
    }
}
