import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ReportDialogComponent } from './reportDialog.component';
import { MaterialModule } from '../../shared/material.module';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { LoggerService } from '../../../services/logger.service';


@NgModule({
    declarations: [ReportDialogComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        DialogModule
    ],
    bootstrap: [ReportDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        LoggerService
    ]
})
export class ReportDialogModule {}
