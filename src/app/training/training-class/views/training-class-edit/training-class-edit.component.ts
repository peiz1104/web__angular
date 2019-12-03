import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { UserGroup } from 'app/system/entity/user-group';
import { NzMessageService } from 'ng-zorro-antd';
import { FormDataUtil } from 'app/core';
declare let $: any;
@Component({
    selector: 'spk-training-class-edit',
    templateUrl: './training-class-edit.component.html',
    styleUrls: ['./training-class-edit.component.scss']
})
export class TrainingClassEditComponent implements OnInit {
    spinning;
    loading;
    trainingClass: any;
    isDisabled: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
        private message: NzMessageService,
    ) {

    }

    ngOnInit() {
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingClass = obj.trainingClass
            }
        );
    }
    onSave(event) {
        let value = event.value;
        this.loading = true;
        console.log(value);
        value.id = '' + this.trainingClass.id;
        let userGroup = new UserGroup()
        userGroup.id = this.trainingClass.userGroupId;
        let Params = {
            ...value,
            userGroup: { id: userGroup.id }
        }
        this.trainingClassApi.saveNew(Params).subscribe(
            ok => {
                this.tipMessage('success', '修改培训班成功！');
                this.loading = false;
                // this.toList();
            },
            err => {
                this.tipMessage('error', '修改培训班失败！');
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }
}
