import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './components/shared/material.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AccountService } from './services/account.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        RouterModule.forRoot(routes),
        HomeModule,
    ],
    entryComponents: [],
    providers: [AccountService],
    bootstrap: [AppComponent]
})
export class AppModule { }
