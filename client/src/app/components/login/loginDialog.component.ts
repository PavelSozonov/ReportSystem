import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';
import { CustomValidators } from '../shared/dialog/inputValidator';

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'loginDialog.component.html',
    styleUrls: ['loginDialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

    private dialogTitle = 'Login Dialog';
    private submitButtonName = 'Log in';
    private hide = true;

    private loginFormGroup: FormGroup;
    private formErrors = {
        name: '',
        password: ''
    };

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
        private form: FormBuilder,
        private readonly formService: FormService,
        private readonly router: Router,
        private readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    public validateUser(): void {
        this.formService.markFormGroupTouched(this.loginFormGroup);
        if (this.loginFormGroup.valid) {
            const username: string = this.loginFormGroup.get('name').value;
            const password: string = this.loginFormGroup.get('password').value;
            this.authService.login(username, password).then(isLogin => {
                if (isLogin) {
                    this.dialogRef.close();
                    this.router.navigate(['/reports']);
                }
            });
            this.loginFormGroup.reset();
        } else {
            this.formErrors = this.formService.validateForm(this.loginFormGroup, this.formErrors, false);
        }
    }

    private buildForm(): void {
        this.loginFormGroup = this.form.group({
            name: [
                '', [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20),
                    CustomValidators.validateCharacters
                ]
            ],
            password: [
                '', [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20)
                ]
            ]
        });

        this.loginFormGroup.valueChanges.subscribe((data) => {
            this.formErrors = this.formService.validateForm(this.loginFormGroup, this.formErrors, true);
        });
    }
}
