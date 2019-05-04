import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'loginDialog.component.html',
    styleUrls: ['loginDialog.component.scss']
})
export class LoginDialogComponent {

    private username: string;
    private password: string;

    private dialogTitle = 'Login Dialog';
    private submitButtonName = 'Log in';
    private hide = true;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
        private readonly router: Router,
        private readonly authService: AuthService) {
    }

    public validateUser(): void {
        this.authService.login(this.username, this.password).then(isLogin => {
            if (isLogin) {
                this.dialogRef.close();
                this.router.navigate(['/reports']);
                this.username = '';
                this.password = '';
            }
        });
    }
}
