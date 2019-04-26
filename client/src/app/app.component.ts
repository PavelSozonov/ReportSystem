import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    links = [
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

    isDarkTheme = false;
    showAuthed = false;
  // currentUser: Observable<User>;

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private readonly accountService: AccountService
    ) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
        const avatarsSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            './assets/avatars.svg'
        );
        this.iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
        // this.currentUser = this.auth.currentUser();
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
        // this.auth.verifyAuth();
    }

    signout() {
        // this.auth.signout();
    }
}
