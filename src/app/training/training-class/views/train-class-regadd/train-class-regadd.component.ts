import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../service/training-class-api.service';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-train-class-regadd',
    templateUrl: './train-class-regadd.component.html',
    styleUrls: ['./train-class-regadd.component.scss']
})
export class TrainClassRegaddComponent implements OnInit {
    validateForm: FormGroup;
    searchOptions: any;
    loading: boolean = false;
    trainId: any;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private service: TrainingClassApiService,
        private confirmServ: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userID: [[], [Validators.required]]
        })
        this.routeInfo.parent.params.subscribe(
            res => {
                this.trainId = res.tbcId;
                console.log(this.trainId, 334)
            }
        )

    }
    // 保存人员
    _save(event) {

        if (this.validateForm.invalid) {
            tipMessage('表单验证失败！');
            return
        }
        let ids = this.getuserId(this.validateForm.value.userID);
        let paramsobj = {
            trainingClass: {
                id: this.trainId,
            },
            userIds: ids
        }
        this.loading = true;
        this.service.addregperson(paramsobj).subscribe(
            res => {
                this.loading = false;
                tipMessage('添加注册人成功！', 'success');
                this.route.navigate(['../', 'registrationlist'], { relativeTo: this.routeInfo })
            },
            err => {
                this.loading = false;
                return tipMessage(err);
            }
        )

        console.log(this.validateForm.value, ids);
    }
    // 取消
    cancel(event) {
        this.route.navigate(['../', 'registrationlist'], { relativeTo: this.routeInfo })
    }
    // 获取人员的id
    getuserId(array?: any[]) {

        let ids = [];
        array.map((item, i) => {
            ids.push(item.id);
        })
        return ids;
    }

}
