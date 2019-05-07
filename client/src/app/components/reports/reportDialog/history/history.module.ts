import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../../shared/material.module';
import { HistoryComponent } from './history.component';
import { HttpService } from '../../../../services/http.service';

@NgModule({
    declarations: [HistoryComponent],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [HistoryComponent],
    providers: [HttpService]
})
export class HistoryModule {}
