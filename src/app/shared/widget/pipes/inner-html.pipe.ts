import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'innerHtmlPipe'
})
export class InnerHtmlPipe implements PipeTransform {
    constructor(
        private sanitizer: DomSanitizer
    ) {
    }
    transform(value: string, args?: any): any {
        value = value || '';
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

}
