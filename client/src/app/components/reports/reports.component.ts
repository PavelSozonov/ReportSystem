import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Report, ReportView } from '../../core/report';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    private displayedColumns: string[] = ['number', 'title', 'status'];
    private dataSource: MatTableDataSource<ReportView>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private readonly reportService: ReportService) {}

    ngOnInit(): void {
        console.log('ReportsComponent was loaded');

        this.reportService.getReports().then(reports => {
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
    }

    get message(): string {
        return 'Reports from \'InnoReportSystem\'!';
    }
}
