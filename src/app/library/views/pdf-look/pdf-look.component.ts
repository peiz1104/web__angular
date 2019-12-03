import { DomSanitizer } from '@angular/platform-browser';
import { DocumentInfo } from 'app/library/entity/document-info';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentInfoService } from 'app/library/service/documentInfo.service';
import { Component, OnInit, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-pdf-look',
    templateUrl: './pdf-look.component.html',
    styleUrls: ['./pdf-look.component.scss']
})
export class PdfLookComponent implements OnInit {
    @Input() documentInfoId;
    documentInfo: DocumentInfo;

    constructor(private router: Router, private route: ActivatedRoute,
        private documentInfoService: DocumentInfoService, private message: NzMessageService, public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        // console.log(this.documentInfoId, 234)
        let documentInfoId;
        this.route.paramMap.subscribe((pm) => {
            documentInfoId = pm.get('documentInfoId');
        });
        // console.log(this.documentInfoId, 234)
        let id = documentInfoId || this.documentInfoId;
        this.documentInfoService.getOne(id).subscribe(
            documentInfo => {
                this.documentInfo = documentInfo;
            },
            err => { tipMessage(err) }
        )
    }

    getPreviewPath() {
        if (this.documentInfo) {
            let src = "/lmsapi/pdf/cmi.html";
            let param = "?content=" + this.documentInfo.previewPath + "&number=" + this.documentInfo.convertImageNum
                + "&imageType=" + this.documentInfo.convertImageType + "&viewMode=pdf";
            return this.sanitizer.bypassSecurityTrustResourceUrl(src + param);
        }
    }

}
