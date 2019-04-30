import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { browser } from './util/browser';
import { LoginDialogComponent } from './components/login/loginDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private links = [
        {
            icon: 'home',
            path: '',
            label: 'Home'
        },
        {
            icon: 'assignment',
            path: '/post/list',
            label: 'Reports'
        },
        {
            icon: 'add',
            path: '/post/new',
            label: 'New report'
        }
    ];
  // currentUser: Observable<User>;

    constructor(
        private readonly authService: AuthService,
        public loginDialog: MatDialog
    ) {}

    private openLoginDialog(): void {
        const dialogRef = this.loginDialog.open(LoginDialogComponent, {
          width: '300px',
          // data: {name: this.name, pass: this.password}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.user = result;
        });
      }

    public get isUserLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    public get userName(): string {
        return this.authService.userName;
    }

    public logout() {
        this.authService.logout();
    }

    public get cssClassList() {
        const res = new Array<string>();

        if (browser.isMobile()) {
            res.push('app-mobile');
        }
        if (browser.isIE()) {
            res.push('app-ie');
        }

        return res;
    }

  // openAdminDialog() {
  //   this.dialog.open(DialogComponent).afterClosed()
  //     .filter(result => !!result)
  //     .subscribe(user => {
  //       this.users.push(user);
  //       this.selectedUser = user;
  //     });
  // }

    ngOnInit(): void {
        console.log('calling ngOnInit...');
    }
}
