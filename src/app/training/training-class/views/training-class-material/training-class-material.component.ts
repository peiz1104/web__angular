import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { TrainingClass } from './../../../entity/training-class';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-material',
    templateUrl: './training-class-material.component.html',
    styleUrls: ['./training-class-material.component.scss']
})
export class TrainingClassMaterialComponent implements OnInit {

    trainingClass: TrainingClass;

    constructor(
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(({ trainingClass }: { trainingClass: TrainingClass }) => {
            this.trainingClass = trainingClass;
        });
    }

    initGroup() {
        this.trainingClassApi.initMaterialGroup(this.trainingClass.id).subscribe(
            mgId => {
                this.trainingClass.materialGroupId = mgId
                tipMessage('初始化资料管理成功', 'success');
            },
            err => {
                tipMessage('初始化资料管理失败，请重试！');
            }
        );
    }

}
