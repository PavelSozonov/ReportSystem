import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './components/shared/material.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { LoginDialogModule } from './components/login/loginDialog.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './services/logger.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'reports', redirectTo: '', canActivate: [AuthGuard] }
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
        LoginDialogModule
    ],
    entryComponents: [],
    providers: [AuthService, HttpService, LoggerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
