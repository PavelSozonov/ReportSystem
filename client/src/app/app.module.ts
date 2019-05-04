import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './components/shared/material.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AuthService } from './services/auth.service';
import { LoginDialogModule } from './components/login/loginDialog.module';
import { HttpService } from './services/http.service';
import { LoggerService } from './services/logger.service';
import { ReportsModule } from './components/reports/reports.module';

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
        HttpClientModule,
        HomeModule,
        ReportsModule,
        LoginDialogModule
    ],
    entryComponents: [],
    providers: [AuthService, HttpService, LoggerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
