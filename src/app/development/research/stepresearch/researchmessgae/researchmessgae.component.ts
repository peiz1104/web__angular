import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../../service/research.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-researchmessgae',
    templateUrl: './researchmessgae.component.html',
    styleUrls: ['./researchmessgae.component.scss']
})
export class ResearchmessgaeComponent implements OnInit {
    @Input() id: any;
    @Input() phaseId: any;
    spinning: boolean = true;
    detailData: any = {};
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private service: ResearchService,
        private confirmv: NzModalService
    ) { }

    ngOnInit() {
        this.service.getdevstageDetail(this.id, this.phaseId).subscribe(
            res => {
                this.spinning = false;
                this.detailData = res;
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }

}
