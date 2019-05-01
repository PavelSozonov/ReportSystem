import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../material.module';
import { DialogHeaderComponent } from './dialogHeader.component';
import { DialogFooterComponent } from './dialogFooter.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DialogHeaderComponent, DialogFooterComponent],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [DialogHeaderComponent, DialogFooterComponent],
    providers: [{provide: MatDialogRef, useValue: {}}]
})
export class DialogModule {}
