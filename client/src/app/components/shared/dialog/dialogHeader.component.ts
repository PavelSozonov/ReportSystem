import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-header',
    templateUrl: 'dialog-header.component.html',
    styleUrls: ['dialog.component.scss']
})
export class DialogHeaderComponent implements OnInit {
    @Input() dialogTitle: string;

    constructor(public dialogRef: MatDialogRef<DialogHeaderComponent>) {
    }

    ngOnInit(): void {
        console.log('DialogHeaderComponent was loaded');
    }
}
