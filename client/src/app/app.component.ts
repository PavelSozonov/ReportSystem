import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthService } from './services/auth.service';
import { browser } from './util/browser';
import { LoginDialogComponent } from './components/login/loginDialog.component';
import { ReportDialogComponent, ReportDialogData } from './components/reports/reportDialog/reportDialog.component';
import { LoggerService } from './services/logger.service';

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
        }
    ];

    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService,
        public dialog: MatDialog) {
            this.authService.loadUser();
        }

    private openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '300px'
        });
        console.log('LoginDialogComponent was opened');

        dialogRef.afterClosed().subscribe(() => {
            console.log('LoginDialogComponent was closed');
        });
    }

    private openNewReportDialog(): void {
        if (this.isUserLoggedIn) {
            const dialogRef = this.dialog.open(ReportDialogComponent, {
                data: <ReportDialogData>{
                    canEdit: false,
                    isCreate: true
                },
                height: '450px',
                width: '600px'
            });
            console.log('NewReportDialog was opened');

            dialogRef.afterClosed().subscribe((value: any) => {
                console.log('NewReportDialog was closed');
            });
        } else {
            this.openLoginDialog();
            this.logger.error('You should log in to submit new report');
        }
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
