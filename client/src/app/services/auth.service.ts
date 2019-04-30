import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { User } from '../core/user';
import { HttpService } from './http.service';
import { resolve } from 'url';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from './logger.service';

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
            const user = await this.httpService.getUser(username, password);
            if (user.password === password) {
                this.currentUserName = user.code;
                this.currentUserEntity = user.entity;
                localStorage.setItem('ACCESS_TOKEN', 'access_token');
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
        return localStorage.getItem('ACCESS_TOKEN') !== null;
    }

    public isAdmin(): boolean {
        return this.currentUserEntity !== null;
    }

    public logout() {
        this.currentUserName = null;
        this.currentUserEntity = null;
        localStorage.removeItem('ACCESS_TOKEN');
    }

    public get userName(): string {
        return this.currentUserName;
    }

    public get userEntity(): string {
        return this.currentUserEntity;
    }
}
