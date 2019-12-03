import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'textFiltering'
})

export class TextFilteringPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: any, args?: any): any {
        value = value || '暂无获取内容';
        let reg = /&lt;/g;
        let reg2 = /&gt;/g;
        let reg3 = /&quot;/g;
        let reg4 = /&amp;/g;
        value = value.replace(reg, '<');
        value = value.replace(reg2, '>');
        value = value.replace(reg3, '"');
        value = value.replace(reg4, '&');
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}