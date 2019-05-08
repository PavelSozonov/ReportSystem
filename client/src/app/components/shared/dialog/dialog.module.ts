import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../material.module';
import { DialogHeaderComponent } from './dialogHeader.component';
import { DialogFooterComponent } from './dialogFooter.component';
import { NoDblClickDirectiveMat } from './noDoubleClickMaterial';

@NgModule({
    declarations: [DialogHeaderComponent, DialogFooterComponent, NoDblClickDirectiveMat],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [DialogHeaderComponent, DialogFooterComponent],
    providers: [{provide: MatDialogRef, useValue: {}}]
})
export class DialogModule {}
