import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from './services/auth.service';
import { browser } from './util/browser';
import { LoginDialogComponent } from './components/login/loginDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private readonly links = [
        {
            icon: 'home',
            path: '',
            label: 'Home'
        },
        {
            icon: 'assignment',
            path: '/reports',
            label: 'Reports'
        },
        {
            icon: 'add',
            path: '/reports/new',
            label: 'New report'
        }
    ];

    constructor(
        private readonly authService: AuthService,
        public loginDialog: MatDialog) {
            this.authService.loadUser();
        }

    private openLoginDialog(): void {
        const dialogRef = this.loginDialog.open(LoginDialogComponent, {
            width: '300px'
        });
        console.log('LoginDialogComponent was opened');

        dialogRef.afterClosed().subscribe(() => {
            console.log('LoginDialogComponent was closed');
        });
      }

    public get isUserLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    public get userNameLabel(): string {
        return browser.isMobile() === false
            ? `Hello, ${this.authService.userName}!`
            : this.authService.userName;
    }

    public get userRole(): string {
        return this.authService.userEntity || 'Citizen';
    }

    public logout(): void {
        this.authService.logout();
    }

    public get cssClassList(): string[] {
        const res = new Array<string>();

        if (browser.isMobile()) {
            res.push('app-mobile');
        }
        if (browser.isIE()) {
            res.push('app-ie');
        }

        return res;
    }

    ngOnInit() {
        console.log('AppComponent was loaded');
    }
}
