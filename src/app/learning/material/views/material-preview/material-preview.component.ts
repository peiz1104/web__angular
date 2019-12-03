import { Output, Input, ContentChild, TemplateRef } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { DocumentInfo } from './../../../../library/entity/document-info';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentInfoService } from './../../../../library/service/documentInfo.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-material-preview',
    templateUrl: './material-preview.component.html',
    styleUrls: ['./material-preview.component.scss']
})
export class MaterialPreviewComponent implements OnInit {
    @Input() documentInfoId: number;
    loading = true;
    documentInfo: DocumentInfo;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private documentInfoService: DocumentInfoService,
        private modalService: NzModalService,
        public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.documentInfoService.getOne(this.documentInfoId).subscribe(
            documentInfo => {
                this.documentInfo = documentInfo;
                this.loading = false;
            },
            err => { tipMessage(err); this.loading = false; }
        )
    }

    getPreviewPath() {
        if (this.documentInfo) {
            let src = "/lmsapi/pdf/cmi.html";
            let param = "?content=" + this.documentInfo.previewPath + "&number=" + this.documentInfo.convertImageNum
                + "&imageType=" + this.documentInfo.convertImageType + "&viewMode=pdf";
            // console.log(src+ param);
            return this.sanitizer.bypassSecurityTrustResourceUrl(src + param);
        }
    }
}
