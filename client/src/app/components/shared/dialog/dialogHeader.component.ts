import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { BaseDialogComponent } from './draggableDialog.component';

@Component({
    selector: 'app-dialog-header',
    templateUrl: 'dialog-header.component.html',
    styleUrls: ['dialog.component.scss']
})
export class DialogHeaderComponent extends BaseDialogComponent {

    @Input() dialogTitle: string;

    constructor(public dialogRef: MatDialogRef<DialogHeaderComponent>,
        _overlay: Overlay,
        _viewContainerRef: ViewContainerRef) {
        super(_overlay, _viewContainerRef);
    }

}
