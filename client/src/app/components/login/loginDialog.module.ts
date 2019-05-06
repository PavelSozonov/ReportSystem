import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginDialogComponent } from './loginDialog.component';
import { MaterialModule } from '../shared/material.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@NgModule({
    declarations: [LoginDialogComponent],
    imports: [
        MaterialModule,
        CommonModule,
        DialogModule,
        ReactiveFormsModule
    ],
    bootstrap: [LoginDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        AuthService,
        FormService
    ]
})
export class LoginDialogModule {}
