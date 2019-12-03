import { UgcActivity } from './../../../entity/ugc-activity';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivityService } from './../../../service/ugc-activity.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'spk-ugc-activity-condition-list',
    templateUrl: './ugc-activity-condition-list.component.html',
    styleUrls: ['./ugc-activity-condition-list.component.scss']
})
export class UgcActivityConditionListComponent implements OnInit {

    ugcActivity: UgcActivity;
    matchImport: boolean = true;
    matchLogicalGroup: boolean = false;
    loading: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugcActivityService: UgcActivityService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
        })
    }

    initCondition() {
        this.loading = true;
        this.ugcActivityService.addCondition(this.ugcActivity.id).subscribe(
            condition => {
                if (condition) {
                        this.ugcActivity.condition = condition;
                } else {
                    this.message.success('初始化注册条件失败');
                }
                this.loading = false;
            },
            err => {
                this.message.error(err);
                this.loading = false;
            }
        );
    }

}
