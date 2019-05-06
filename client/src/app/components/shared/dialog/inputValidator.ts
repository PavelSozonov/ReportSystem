import { FormControl, Validators } from '@angular/forms';

// simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+'`@-]/;

export class CustomValidators extends Validators {

    static validateCharacters(control: FormControl) {
        if (control.value && control.value.length > 0) {
            const matches = control.value.match(validCharacters);
            return matches && matches.length ? { invalid_characters: matches } : null;
        } else {
            return null;
        }
    }
}
