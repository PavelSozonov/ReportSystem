import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { Report } from '../../../core/report';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

    private isCreate = this.data.isCreate;
    private canEdit = this.data.canEdit;

    private dialogTitle = this.isCreate ? 'New Report' : 'View Report';
    private submitButtonName = this.isCreate ? 'Submit' : this.canEdit ? 'Change Status' : null;

    private report: Report = this.data.report;

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private readonly router: Router,
        @Inject(MAT_DIALOG_DATA) private data: ReportDialogData) {
    }

    ngOnInit(): void {
        console.log(`Report '${this.data.report.number}' was loaded into ReportDialogComponent`);
    }

    public createReport(): void {
    }

    public changeStatus(): void {
    }
}

export interface ReportDialogData {
    report: Report;
    isCreate: boolean;
    canEdit: boolean;
}
