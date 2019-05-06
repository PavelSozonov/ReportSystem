import * as _ from 'lodash';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';

import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'app-chips',
    templateUrl: 'chips.component.html',
    styleUrls: ['chips.component.scss']
})
export class ChipsComponent implements OnInit {

    @Input() disabled: boolean;

    private readonly selectable = true;
    private readonly removable = !this.disabled;
    private readonly tagsError = 'Tags property should not be empty';

    private filteredTags: string[] = [];

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    public tags: string[] = [];

    constructor(private readonly httpService: HttpService) {
    }

    public valid(): boolean {
        return this.tags.length !== 0;
    }

    private enabled(): boolean {
        let enabled = true;
        if (this.tags) {
            enabled = this.tags.length < 5;
        }
        return enabled && !this.disabled;
    }

    private remove(tag: string): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.filteredTags.push(tag);
        }
    }

    private selected(event: MatAutocompleteSelectedEvent): void {
        const tag = event.option.viewValue;
        const index = this.filteredTags.indexOf(tag);
        if (index >= 0) {
            this.tags.push(event.option.viewValue);
            this.filteredTags.splice(index, 1);
        }
    }

    ngOnInit(): void {
        console.log('ChipsComponent was loaded');

        this.httpService.getTags().then(tags => {
            this.filteredTags = tags;
            console.log('Tag list was loaded');
        }).catch(error => {
            console.error('Tag list was not loaded');
        });
    }
}
