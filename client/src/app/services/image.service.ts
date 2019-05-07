import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private base64: string;

    private readonly url = 'https://www.googleapis.com/download/storage/v1/b/innoreport-b3617.appspot.com/o';
    private readonly suffix = '.jpg?alt=media';
    private readonly prefixBase64 = 'data:image/jpeg;base64,';

    constructor(private readonly logger: LoggerService) {
    }

    public getLink(reportId: number): string {
        const link = `${this.url}/${reportId}${this.suffix}`;
        // TODO: check link coerrectness
        return link;
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
}
