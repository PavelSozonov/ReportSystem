import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('HomeComponent was loaded');
    }

    get message(): string {
        return 'Hello everyone! Today we are presenting our application called \'InnoReportSystem\'!';
    }
}
