import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private file: File;

    constructor(private readonly logger: LoggerService) {
    }

    public getImageUrl(event: HTMLInputEvent): Promise<string> {
        return new Promise(resolve => {
            const files = event.target.files;
            if (files && files[0] && typeof (FileReader) !== 'undefined') {
                const file: File = files[0];
                if (file.type === 'image/jpeg') {
                    this.file = file;
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e: FileReaderEvent) => {
                        resolve(e.target.result);
                    };
                } else {
                    this.logger.error('An image should have only JPG format');
                    resolve(null);
                }
            }
        });
    }

    public getImage(): Promise<string> {
        return new Promise(resolve => {
            if (this.file && typeof (FileReader) !== 'undefined') {
                const reader = new FileReader();
                reader.readAsArrayBuffer(this.file);
                reader.onload = (e: FileReaderEvent) => {
                    resolve(e.target.result);
                };
            } else {
                this.logger.error('An error occurred while reading the image');
                resolve(null);
            }
        });
    }
}
