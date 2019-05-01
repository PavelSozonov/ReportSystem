import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MaterialModule
    ],
    declarations: [HomeComponent],
    bootstrap: [HomeComponent]
})
export class HomeModule { }
