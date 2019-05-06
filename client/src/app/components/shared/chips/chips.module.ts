import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ChipsComponent } from './chips.component';
import { HttpService } from '../../../services/http.service';

@NgModule({
    declarations: [ChipsComponent],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [ChipsComponent],
    providers: [HttpService]
})
export class ChipsModule {}
