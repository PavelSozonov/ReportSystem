import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'}
)
export class FormService {

    // get all values of the formGroup, loop over them
    // then mark each field as touched
    public markFormGroupTouched(formGroup: FormGroup) {
        _.forEach(formGroup.controls, control => {
            control.markAsTouched();
            const controls = (<FormGroup>control).controls;
            if (controls) {
                _.forEach(controls, c => this.markFormGroupTouched(<FormGroup>c));
            }
        });
    }

    // return list of error messages
    public validationMessages() {
        const messages = {
            required: 'This field is required',
            minlength: (minLength: {requiredLength: number, actualLength: number}) => {
                return `Min length should be ${minLength.requiredLength} characters`;
            },
            maxlength: (maxLength: {requiredLength: number, actualLength: number}) => {
                return `Max length should be ${maxLength.requiredLength} characters`;
            },
            invalid_characters: (matches: any[]) => {

                let matchedCharacters = matches;

                matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
                    let string = characterString;
                    string += character;

                    if (matchedCharacters.length !== index + 1) {
                        string += ', ';
                    }

                    return string;
                }, '');

                return `These characters are not allowed: ${matchedCharacters}`;
            }
        };

        return messages;
    }

    // Validate form instance
    // check_dirty true will only emit errors if the field is touched
    // check_dirty false will check all fields independent of
    // being touched or not. Use this as the last check before submitting
    public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
        const form = formToValidate;

        for (const field in formErrors) {
            if (field) {
                formErrors[field] = '';
                const control = form.get(field);
                const messages = this.validationMessages();

                if (control && !control.valid) {
                    if (!checkDirty || (control.dirty || control.touched)) {
                        for (const key in control.errors) {
                            if (key && key !== 'invalid_characters' && key !== 'minlength' && key !== 'maxlength') {
                                formErrors[field] = formErrors[field] || messages[key];
                            } else {
                                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
                            }
                        }
                    }
                }
            }
        }

        return formErrors;
    }
}
