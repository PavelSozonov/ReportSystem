import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-dialog',
    templateUrl: 'reportDialog.component.html',
    styleUrls: ['reportDialog.component.scss']
})
export class ReportDialogComponent {

    private username: string;
    private password: string;

    private dialogTitle = 'Report Dialog';
    private submitButtonName = 'Create';

    constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
        private readonly router: Router) {
    }

    public createReport(): void {
    }
}
