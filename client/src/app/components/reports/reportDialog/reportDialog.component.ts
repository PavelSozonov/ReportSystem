import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { Report } from '../../../core/report';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormService } from '../../../services/form.service';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit {
    private reportsFormGroup: FormGroup;
    private formErrors = {
        title: '',
        description: ''
    };
    private isCreate = this.data.isCreate;
    private canEdit = this.data.canEdit;

    private report: Report = this.data.report;

    private dialogTitle = this.isCreate ? 'New Report' : `Report '${this.report.number}'`;
    private submitButtonName = this.isCreate ? 'Submit' : this.canEdit ? 'Change Status' : null;
    private submit = this.isCreate ? this.createReport : this.changeStatus;

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private readonly router: Router,
        private form: FormBuilder,
        private readonly formService: FormService,
        @Inject(MAT_DIALOG_DATA) private data: ReportDialogData) {
    }

    ngOnInit(): void {
        console.log(`Report '${this.data.report.number}' was loaded into ReportDialogComponent`);
        this.buildForm();
    }

    private createReport(): void {
    }

    private changeStatus(): void {
    }

    private buildForm(): void {
        this.reportsFormGroup = new FormGroup({
            title: new FormControl({
                value: this.report.title,
                disabled: !this.isCreate
            }, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            status: new FormControl({
                value: this.report.statusString,
                disabled: this.isCreate && !this.canEdit
            }),
            changeDate: new FormControl({
                value: this.report.changeDateString,
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
            ]),
        });

        this.reportsFormGroup.valueChanges.subscribe((data) => {
            this.formErrors = this.formService.validateForm(this.reportsFormGroup, this.formErrors, true);
        });
    }
}

export interface ReportDialogData {
    report: Report;
    isCreate: boolean;
    canEdit: boolean;
}
