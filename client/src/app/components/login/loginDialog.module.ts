import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginDialogComponent } from './loginDialog.component';
import { MaterialModule } from '../shared/material.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { AuthService } from '../../services/auth.service';

@NgModule({
    declarations: [LoginDialogComponent],
    imports: [
        FormsModule,
        MaterialModule,
        DialogModule
    ],
    bootstrap: [LoginDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        AuthService
    ]
})
export class LoginDialogModule {}
