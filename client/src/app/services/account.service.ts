import { User } from '../core/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

    private currentUser: User = null;

    constructor() {
        this.currentUser = new User(1, 'stef', '123', '123', '');
    }

    public isUserExists(): boolean {
        return !!this.currentUser;
    }

    public get userName(): string {
        return this.currentUser.code;
    }

    public logoff() {
        this.currentUser = null;
    }

    public logon(user: User) {
        this.currentUser = user;
    }
}
