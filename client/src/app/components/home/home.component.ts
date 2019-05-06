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

    get systemDescription(): string {
        return 'Here is the functionality of our MVP:\n' +
            '\n' +
            '1. Users (only residents of the City) shall be able to report problems related to the city.\n' +
            '2. A report consists of a title, a brief description of the situation, tags or keywords, and an optional photo.\n' +
            '3. In each report, the title cannot be more than 50 characters, the description no more than 600 characters and no more than 6 tags or keywords. The size of the report’s photo, if any, cannot exceed 5MB.\n' +
            '4. The system shall automatically classify the incoming reports to be redirected to different entities of the City. The report should be classified as one of the follows (although, more entities could be added later): City residents well-being, Health, Government, or Education. \n' +
            '\n' +
            '\n' +
            'We  implemented the backend logic of this solution and provided a database to store the data. As an addition to that minimum, we also took several articles below.\n' +
            '\n' +
            '5. Each report has a status, it is either received, in-progress, solved or declined.\n' +
            '6. Methods are provided in our backend logic to change the status of the submitted tickets.';
    }

    get frontEnd(): string {
        return 'We implemented a simple web interface to facilitate the demonstration of how our backend service works.\n' +
            'The UI will have the options:\n' +
            '   a) to send a ticket\n' +
            '   b) to view the tickets for one of the specified departments\n' +
            '   c) change a ticket status';
    }

    get interface(): string {
        return 'We provided Rest API abstraction layer as a way to call the backend methods and make the interaction with our service easier.\n';
    }

    get qualityAttribute(): string {
        return 'These quality attributes we tried to promote in the architecture of our solution.\n' +
        '1. The system shall be highly available.\n' +
        '2. The classification needs to be a module that can be easily replaceable (plug and play). Initially, the classification can be done using tags of the reports. A smarter classifier (e.g. one that learns by itself how to classify reports) can be adapted.\n' +
        '3. The scalability as required by the specification of the number of overall and active users, and reports.';
    }




}
