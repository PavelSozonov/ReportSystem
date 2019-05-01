import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ReportDialogComponent } from './reportDialog.component';
import { MaterialModule } from '../../shared/material.module';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { ReportService } from '../../../services/report.service';


@NgModule({
    declarations: [ReportDialogComponent],
    imports: [
        FormsModule,
        MaterialModule,
        DialogModule
    ],
    bootstrap: [ReportDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        ReportService
    ]
})
export class ReportDialogModule {}
