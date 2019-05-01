import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../material.module';
import { DialogHeaderComponent } from './dialogHeader.component';
import { DialogFooterComponent } from './dialogFooter.component';

@NgModule({
    declarations: [DialogHeaderComponent, DialogFooterComponent],
    imports: [
        MaterialModule
    ],
    exports: [DialogHeaderComponent, DialogFooterComponent],
    providers: [{provide: MatDialogRef, useValue: {}}]
})
export class DialogModule {}
