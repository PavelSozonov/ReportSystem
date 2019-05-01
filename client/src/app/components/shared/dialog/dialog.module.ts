import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { DialogHeaderComponent } from './dialogHeader.component';
import { MaterialModule } from '../material.module';
import { DialogFooterComponent } from './dialogFooter.component';

@NgModule({
    declarations: [DialogHeaderComponent, DialogFooterComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    exports: [DialogHeaderComponent, DialogFooterComponent],
    providers: [{provide: MatDialogRef, useValue: {}}]
})
export class DialogModule {}
