import * as _ from 'lodash';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

import { Report, Status } from '../../../core/report';
import { FormService } from '../../../services/form.service';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit, AfterViewInit {
    private reportForm: FormGroup;
    private formErrors = {
        title: '',
        description: ''
    };
    private readonly isCreate = true; // this.data.isCreate;
    private readonly canEdit = this.data.canEdit;

    private report: Report = this.data.report;

    private readonly dialogTitle = this.isCreate ? 'New Report' : `Report '${this.report.number}'`;
    private readonly submitButtonName = this.isCreate ? 'Submit' : this.canEdit ? 'Change Status' : null;
    private readonly submit = this.isCreate ? this.createReport : this.changeStatus;
    private readonly filteredStatusList: string[] = _.filter(_.values(Status), value => typeof value === 'string');
    private readonly disabledStatusList: string[] = _.filter([Status[Status.New], Status[Status.Sent]], value => {
        return value !== Report.getStatusString(this.report);
    });
    private tagList: string[] = [];

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private readonly router: Router,
        private form: FormBuilder,
        private readonly formService: FormService,
        @Inject(MAT_DIALOG_DATA) private data: ReportDialogData) {
    }

    private checkStatusOption(option: string): boolean {
        return _.includes(this.disabledStatusList, option);
    }

    ngOnInit(): void {
        console.log(`Report '${this.data.report.number}' was loaded into ReportDialogComponent`);
        this.buildForm();
        this.galleryOptions = [
            {
                thumbnails: false,
                arrowNextIcon: '',
                arrowPrevIcon: '',
                width: '154px',
                height: '154px',
                previewCloseOnClick: true,
                previewCloseOnEsc: true
            },
            {
                breakpoint: 500,
                width: '100%',
                height: '200px',
            }
        ];

        this.galleryImages = [
            {
                small: 'assets/innopolis.jpg',
                medium: 'assets/innopolis.jpg',
                big: 'assets/innopolis.jpg'
            }
        ];
    }

    ngAfterViewInit(): void {
    }

    private createReport(): void {
    }

    private changeStatus(): void {
    }

    private buildForm(): void {
        this.reportForm = new FormGroup({
            title: new FormControl({
                value: this.report.title,
                disabled: !this.isCreate
            }, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            status: new FormControl({
                value: Report.getStatusString(this.report),
                disabled: this.isCreate && !this.canEdit
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
    report: Report;
    isCreate: boolean;
    canEdit: boolean;
}
