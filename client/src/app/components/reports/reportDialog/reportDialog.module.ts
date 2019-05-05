import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ReportDialogComponent } from './reportDialog.component';
import { MaterialModule } from '../../shared/material.module';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { ReportService } from '../../../services/report.service';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../services/form.service';


@NgModule({
    declarations: [ReportDialogComponent],
    imports: [
        MaterialModule,
        DialogModule,
        ReactiveFormsModule,
        CommonModule
    ],
    bootstrap: [ReportDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        ReportService,
        FormService
    ]
})
export class ReportDialogModule {}
