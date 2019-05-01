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
            authService.logout(); // TODO: add checkbox into dialog
        }

    private openLoginDialog(): void {
        const dialogRef = this.loginDialog.open(LoginDialogComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
      }

    public get isUserLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    public get userName(): string {
        return this.authService.userName;
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
        console.log('calling ngOnInit...');
    }
}
