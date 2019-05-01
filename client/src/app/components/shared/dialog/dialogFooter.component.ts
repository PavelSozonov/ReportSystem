import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-footer',
    templateUrl: 'dialog-footer.component.html',
    styleUrls: ['dialog.component.scss']
})
export class DialogFooterComponent implements OnInit {

    @Input() submitButtonName: string;
    @Input() disabled: boolean;
    @Output() clickSubmit: EventEmitter<any> = new EventEmitter();

    submit(): void {
        this.clickSubmit.emit();
    }

    constructor(public dialogRef: MatDialogRef<DialogFooterComponent>) { }

    ngOnInit() {
        console.info('dialog footer');
    }
}
