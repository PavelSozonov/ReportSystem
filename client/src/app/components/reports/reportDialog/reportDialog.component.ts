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

    private username: string;
    private password: string;

    private dialogTitle = 'Report Dialog';
    private submitButtonName = null;

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private readonly router: Router,
        @Inject(MAT_DIALOG_DATA) private report: Report) {
    }

    ngOnInit(): void {
        console.log(`Report '${this.report.number}' was loaded into ReportDialogComponent`);
    }

    public createReport(): void {
    }
}