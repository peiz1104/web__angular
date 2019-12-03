import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityService } from "./../../../service/ugc-activity.service";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-add',
    templateUrl: './ugc-activity-add.component.html',
    styleUrls: ['./ugc-activity-add.component.scss']
})
export class UgcActivityAddComponent implements OnInit {

    ugcActivity: UgcActivity;
    loading: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugcActivityService: UgcActivityService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
    }

    onSave(event) {
        let value = event.value;
        this.loading = true;
        this.ugcActivityService.create(value).subscribe(
            ok => {
                tipMessage('添加活动成功', 'success');
                this.loading = false;
                this.toList();
            },
            err => {
                tipMessage('添加活动失败');
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
