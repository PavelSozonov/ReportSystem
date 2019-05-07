import * as _ from 'lodash';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { ReportHistory, HistoryView } from '../../../../core/history';
import { List } from 'lodash';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent implements OnInit {

    private displayedColumns: string[] = ['changeDate', 'status'];
    private dataSource: MatTableDataSource<HistoryView>;

    @Input() history: ReportHistory[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {}

    ngOnInit(): void {
        console.log('HistoryComponent was loaded');
        this.updateTable();
    }

    private updateTable(): void {
        const historyToView = _.map(this.history, historyItem => {
            return ReportHistory.toView(historyItem);
        });
        this.dataSource = new MatTableDataSource(historyToView);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
