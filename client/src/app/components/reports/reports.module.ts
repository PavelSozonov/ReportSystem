import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { MaterialModule } from '../shared/material.module';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
     { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MaterialModule
    ],
    declarations: [ReportsComponent]
})
export class ReportsModule { }
