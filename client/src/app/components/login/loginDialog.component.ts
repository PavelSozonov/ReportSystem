import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'loginDialog.component.html',
    styleUrls: ['loginDialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

    private username: string;
    private password: string;

    private dialogTitle = 'Login Dialog';
    private submitButtonName = 'Log in';
    private hide = true;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
        private readonly router: Router,
        private readonly authService: AuthService) { }

    ngOnInit() {
        console.info('login form');
    }

    public validateUser() {
        this.authService.login(this.username, this.password).then(isLogin => {
            if (isLogin) {
                this.dialogRef.close();
                this.router.navigate(['/reports']);
                this.username = '';
                this.password = '';
            }
        });
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        console.info('whaaaaaaaaaaaaat');
    }
}
