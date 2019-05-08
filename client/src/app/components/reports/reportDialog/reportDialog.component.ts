import * as _ from 'lodash';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

import { Report, Status } from '../../../core/report';
import { FormService } from '../../../services/form.service';
import { ChipsComponent } from '../../shared/chips/chips.component';
import { ReportService } from '../../../services/report.service';
import { ImageService } from '../../../services/image.service';
import { ReportHistory } from '../../../core/history';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private form: FormBuilder,
        private readonly formService: FormService,
        private readonly reportService: ReportService,
        private readonly imageService: ImageService,
        @Inject(MAT_DIALOG_DATA) private data: ReportDialogData) {
    }
    private reportForm: FormGroup;
    private formErrors = {
        title: '',
        description: ''
    };
    private readonly isCreate = this.data.isCreate;
    private readonly canEdit = this.data.canEdit;

    private report: Report = this.data.report;
    private history: ReportHistory[] = this.data.history;

    private readonly dialogTitle = this.isCreate ? 'New Report' : `Report '${this.report.number}'`;
    private readonly submitButtonName = this.isCreate ? 'Submit' : this.canEdit ? 'Change Status' : null;
    private readonly submit = this.isCreate ? this.createReport : this.changeStatus;
    private readonly filteredStatusList: string[] = !this.isCreate
        ? _.filter(_.values(Status), value => typeof value === 'string')
        : [];
    private readonly disabledStatusList: string[] = !this.isCreate
        ? _.filter([Status[Status.New], Status[Status.Sent]], value => {
            return value !== Report.getStatusString(this.report);
        })
        : [];

    @ViewChild(ChipsComponent) chipsComponent: ChipsComponent;

    private galleryOptions: NgxGalleryOptions[];
    private galleryImages: NgxGalleryImage[];

    private checkStatusOption(option: string): boolean {
        return _.includes(this.disabledStatusList, option);
    }

    ngOnInit(): void {
        this.buildForm();
        this.galleryOptions = this.imageService.getGalleryOptions();

        if (!this.isCreate) {
            const reportId = this.data.report.number;
            this.imageService.getLink(this.report.id).then(imageUrl => {
                if (imageUrl) {
                    this.setImage(imageUrl);
                }
            });
            console.log(`Report '${reportId}' was loaded into ReportDialogComponent`);
            this.chipsComponent.tags = this.data.tags;
        }
    }

    private createReport(): void {
        const title: string = this.reportForm.get('title').value;
        const description: string = this.reportForm.get('description').value;
        const tags = this.chipsComponent.tags;
        const image = this.imageService.getBase64();
        this.reportService.createReport(title, description, tags, image).then(reportId => {
            this.dialogRef.close(reportId);
        });
    }

    private changeStatus(): void {
        const status: string = this.reportForm.get('status').value;
        if (status === Report.getStatusString(this.report)) {
            this.dialogRef.close(false);
            console.log('You did not change report status');
        } else {
            this.reportService.changeStatus(this.report.id, status).then(success => {
                this.dialogRef.close(success);
            });
        }
    }

    private valid(): boolean {
        return this.reportForm.valid && this.chipsComponent.valid();
    }

    private async onSelectFile(event: HTMLInputEvent): Promise<void> {
        const url = await this.imageService.getImageUrl(event);
        if (url) {
            this.setImage(url);
        }
    }

    private setImage(url: string): void {
        this.galleryImages = [
            {
                small: url,
                medium: url,
                big: url
            }
        ];
    }

    private buildForm(): void {
        this.report = this.isCreate ? new Report() : this.report;
        this.reportForm = this.form.group({
            title: new FormControl({
                value: this.report.title,
                disabled: !this.isCreate
            }, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            status: new FormControl({
                value: Report.getStatusString(this.report),
                disabled: !this.isCreate && !this.canEdit
            }),
            changeDate: new FormControl({
                value: Report.getChangeDateString(this.report),
                disabled: true
            }),
            recipient: new FormControl({
                value: this.report.recipient,
                disabled: true
            }),
            sender: new FormControl({
                value: this.report.sender,
                disabled: true
            }),
            description: new FormControl({
                value: this.report.description,
                disabled: !this.isCreate
            }, [
                Validators.required,
                Validators.maxLength(600)
            ])
        });

        this.reportForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formService.validateForm(this.reportForm, this.formErrors, true);
        });
    }
}

export interface ReportDialogData {
    report?: Report;
    tags?: string[];
    history?: ReportHistory[];
    isCreate: boolean;
    canEdit: boolean;
}
