import * as _ from 'lodash';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

import { Report, Status } from '../../../core/report';
import { FormService } from '../../../services/form.service';
import { ChipsComponent } from '../../shared/chips/chips.component';
import { ReportService } from '../../../services/report.service';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit, AfterViewInit {

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private form: FormBuilder,
        private readonly formService: FormService,
        private readonly reportService: ReportService,
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

    private submitted = false;

    private checkStatusOption(option: string): boolean {
        return _.includes(this.disabledStatusList, option);
    }

    ngOnInit(): void {
        this.buildForm();
        if (!this.isCreate) {
            console.log(`Report '${this.data.report.number}' was loaded into ReportDialogComponent`);
            this.chipsComponent.tags = this.data.tags;
        }

        this.galleryOptions = [
            {
                thumbnails: false,
                arrowNextIcon: '',
                arrowPrevIcon: '',
                width: '152px',
                height: '152px',
                previewCloseOnClick: true,
                previewCloseOnEsc: true
            },
            {
                breakpoint: 500,
                width: '100%',
                height: '200px'
                // TODO: find solution for full screen.
                // if full screen solution for draggable dialogs will be found then switch on draggable dialogs.
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
        const title: string = this.reportForm.get('title').value;
        const description: string = this.reportForm.get('description').value;
        const tags = this.chipsComponent.tags;
        this.reportService.createReport(title, description, tags).then(reportId => {
            this.dialogRef.close(reportId);
        }).catch(err => {
            console.error(err);
        });
    }

    private changeStatus(): void {
        const status = this.reportForm.get('status').value;
        this.reportService.changeStatus(this.report.id, status).then(success => {
            this.dialogRef.close(success);
        }).catch(err => {
            console.error(err);
        });
    }

    private valid(): boolean {
        return this.reportForm.valid && this.chipsComponent.valid();
    }

    private onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
               const srcResult = e.target.result;
            };

            reader.readAsArrayBuffer(inputNode.files[0]);
        }
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
    tags: string[];
    isCreate: boolean;
    canEdit: boolean;
}
