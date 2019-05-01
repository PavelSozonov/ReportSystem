import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginDialogComponent } from './loginDialog.component';
import { MaterialModule } from '../shared/material.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { LoggerService } from '../../services/logger.service';

@NgModule({
    declarations: [LoginDialogComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        DialogModule
    ],
    bootstrap: [LoginDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        AuthService,
        HttpService,
        LoggerService
    ]
})
export class LoginDialogModule {}
