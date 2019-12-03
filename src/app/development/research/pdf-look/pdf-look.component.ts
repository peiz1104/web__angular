import { DomSanitizer } from '@angular/platform-browser';
import { DocumentInfo } from 'app/library/entity/document-info';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentInfoService } from 'app/library/service/documentInfo.service';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-pdf-look',
    templateUrl: './pdf-look.component.html',
    styleUrls: ['./pdf-look.component.scss']
})
export class PdfLookComponent implements OnInit {

    documentInfo: DocumentInfo;

    constructor(private router: Router, private route: ActivatedRoute,
        private documentInfoService: DocumentInfoService, public sanitizer: DomSanitizer) {

        let documentInfoId;
        this.route.paramMap.subscribe((pm) => {
            documentInfoId = pm.get('documentInfoId');
        });

        this.documentInfoService.getOne(documentInfoId).subscribe(
            documentInfo => {
                this.documentInfo = documentInfo;
            },
            err => { tipMessage(err) }
        )
    }

    ngOnInit() {
    }

    getPreviewPath() {
        if (this.documentInfo) {
            let src = "/lmsapi/pdf/cmi.html";
            let param = "?content=" + this.documentInfo.previewPath + "&number=" + this.documentInfo.convertImageNum
                + "&imageType=" + this.documentInfo.convertImageType + "&viewMode=pdf";
            return this.sanitizer.bypassSecurityTrustResourceUrl(src + param);
        }
    }
    // 返回
    goBack() {
        window.history.back();
    }

}
