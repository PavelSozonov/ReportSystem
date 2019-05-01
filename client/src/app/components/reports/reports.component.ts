import * as _ from 'lodash';
import { List } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Report, ReportView } from '../../core/report';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ReportDialogComponent } from './reportDialog/reportDialog.component';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    private displayedColumns: string[] = ['number', 'title', 'status'];
    private dataSource: MatTableDataSource<ReportView>;

    @ViewChild(MatSort) sort: MatSort;

    private reports: List<Report>;

    constructor(private readonly reportService: ReportService,
        public reportDialog: MatDialog) {}

    ngOnInit(): void {
        console.log('ReportsComponent was loaded');

        this.reportService.getReports().then(reports => {
            this.reports = reports;
            const reportsToView = _.map(reports, report => {
                return Report.toView(report);
            });
            this.dataSource = new MatTableDataSource(reportsToView);
            this.dataSource.sort = this.sort;
        }).catch(err => {
            console.error(err);
        });
    }

    private selectRow(row: ReportView): void {
        console.log(row);

        const dialogRef = this.reportDialog.open(ReportDialogComponent, {
            width: '300px',
        });
        console.log('LoginDialogComponent was opened');

        dialogRef.afterClosed().subscribe(() => {
            console.log('LoginDialogComponent was closed');
        });
    }

    get message(): string {
        return 'Reports from \'InnoReportSystem\'!';
    }
}
