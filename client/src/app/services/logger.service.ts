import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private matSnackBarConfig: MatSnackBarConfig;

    constructor(private readonly snackBar: MatSnackBar) {
        this.matSnackBarConfig = new MatSnackBarConfig();
        this.matSnackBarConfig.duration = 2000;
        this.matSnackBarConfig.horizontalPosition = 'start';
        this.matSnackBarConfig.verticalPosition = 'bottom';
    }

    public success(message: string) {
        this.matSnackBarConfig.panelClass = ['logger-success'];
        this.snackBar.open(message, null, this.matSnackBarConfig);
        console.info(message);
    }

    public error(message: string) {
        this.matSnackBarConfig.panelClass = ['logger-error'];
        this.snackBar.open(message, null, this.matSnackBarConfig);
        console.warn(message);
    }
}
