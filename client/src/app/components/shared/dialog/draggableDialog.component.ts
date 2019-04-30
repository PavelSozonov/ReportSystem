import { Component,
         ViewChild,
         TemplateRef,
         AfterViewInit,
         ViewContainerRef,
         OnDestroy} from '@angular/core';
    import {Overlay, OverlayRef} from '@angular/cdk/overlay';
    import {TemplatePortal} from '@angular/cdk/portal';

export class BaseDialogComponent implements AfterViewInit, OnDestroy {
    @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
    private _overlayRef: OverlayRef;
    private _portal: TemplatePortal;

    constructor(public _overlay: Overlay, public _viewContainerRef: ViewContainerRef) {}

    ngAfterViewInit() {
        this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
        this._overlayRef = this._overlay.create({
            positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
    }

    ngOnDestroy() {
        this._overlayRef.dispose();
    }

    openDialog() {
        this._overlayRef.attach(this._portal);
    }
}
