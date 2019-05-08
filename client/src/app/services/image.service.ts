import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxGalleryOptions } from 'ngx-gallery';

import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private base64: string;

    private readonly url = 'https://www.googleapis.com/download/storage/v1/b/innoreport-b3617.appspot.com/o/';
    private readonly extension = '.jpg';
    private readonly suffix = '?alt=media';
    private readonly prefixBase64 = 'data:image/jpeg;base64,';

    constructor(private readonly logger: LoggerService,
        private readonly httpService: HttpService) {
    }

    public getLink(reportId: number): Promise<string> {
        const link = `${this.url}${reportId}${this.extension}${this.suffix}`;
        return new Promise(resolve => {
            this.httpService.checkImageUrl(link).then(value => {
                if (value) {
                    resolve(link);
                } else {
                    resolve(null);
                }
            }).catch((err: HttpErrorResponse) => {
                if (err.status === 200) {
                    resolve(link);
                } else {
                    resolve(null);
                }
            });
        });
    }

    public getImageUrl(event: HTMLInputEvent): Promise<string> {
        return new Promise(resolve => {
            const files = event.target.files;
            if (files && files[0] && typeof (FileReader) !== 'undefined') {
                const file: File = files[0];
                if (file.type === 'image/jpeg') {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e: FileReaderEvent) => {
                        this.base64 = e.target.result;
                        resolve(e.target.result);
                    };
                } else {
                    this.logger.error('An image should have only JPG format');
                    resolve(null);
                }
            }
        });
    }

    public getBase64(): string {
        if (this.base64) {
            return this.base64.replace(this.prefixBase64, '');
        }
        return '';
    }

    public getGalleryOptions(): NgxGalleryOptions[] {
        return [
            {
                thumbnails: false,
                arrowNextIcon: '',
                arrowPrevIcon: '',
                width: '100%',
                height: '66%',
                previewZoom: true,
                previewCloseOnClick: true,
                previewCloseOnEsc: true
            }
        ];
    }
}
