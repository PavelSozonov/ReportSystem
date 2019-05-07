import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoggerService } from './logger.service';
import { LoginDialogComponent } from '../components/login/loginDialog.component';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private readonly loggerService: LoggerService,
        private loginDialog: MatDialog,
        private readonly router: Router) {}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
            this.loggerService.error('To operate with reports you should log in...');
            this.openLoginDialog();
            return false;
        }
        return true;
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
}
