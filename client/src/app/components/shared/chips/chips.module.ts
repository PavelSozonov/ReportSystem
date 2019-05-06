import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { HttpService } from '../../../services/http.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ChipsComponent],
    imports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [ChipsComponent],
    providers: [HttpService]
})
export class ChipsModule {}
