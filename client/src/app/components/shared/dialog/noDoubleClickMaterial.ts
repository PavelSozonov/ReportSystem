import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoDblClickMat]'
})
export class NoDblClickDirectiveMat {
  constructor() { }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        // see if the srcElement has the disabled property. If so then it is the actual button. If not then the user
        // clicked on the button's text (span element)
        const button = (event.srcElement.disabled === undefined) ? event.srcElement.parentElement : event.srcElement;
        button.setAttribute('disabled', true);
        setTimeout(function () {
            button.removeAttribute('disabled');
        }, 1000);
    }
}
