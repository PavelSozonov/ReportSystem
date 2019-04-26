import { User } from '../core/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

    private currentUser: User = null;

    constructor() {
        this.currentUser = new User(1, 'stef', '123', '123', '');
    }

    public get user(): User {
        return this.currentUser;
    }

    public set user(user: User) {
        this.currentUser = user;
    }
}
