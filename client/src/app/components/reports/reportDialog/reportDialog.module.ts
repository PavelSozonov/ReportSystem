import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from 'ngx-gallery';

import { ReportDialogComponent } from './reportDialog.component';
import { MaterialModule } from '../../shared/material.module';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { ReportService } from '../../../services/report.service';
import { FormService } from '../../../services/form.service';
import { ChipsModule } from '../../shared/chips/chips.module';
import { ImageService } from '../../../services/image.service';

@NgModule({
    declarations: [ReportDialogComponent],
    imports: [
        MaterialModule,
        DialogModule,
        ReactiveFormsModule,
        CommonModule,
        ChipsModule,
        NgxGalleryModule
    ],
    bootstrap: [ReportDialogComponent],
    providers: [
        {provide: MatDialogRef, useValue: {}},
        ReportService,
        ImageService,
        FormService
    ]
})
export class ReportDialogModule {}
