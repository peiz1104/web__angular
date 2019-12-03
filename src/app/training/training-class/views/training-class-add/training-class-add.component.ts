import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrainingClass } from './../../../entity/training-class';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
declare let $: any;
@Component({
    selector: 'spk-training-class-add',
    templateUrl: './training-class-add.component.html',
    styleUrls: ['./training-class-add.component.scss']
})
export class TrainingClassAddComponent implements OnInit {

    trainingClass: TrainingClass;
    loading: boolean = false;
    isDisabled: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
    }


    onSave(event) {
        let value = event.value;
        this.loading = true;
        console.log(value, 223);
        this.trainingClassApi.judgeAnnualPlan().subscribe(
            res => {
                // console.log(res, 222)
                if (res.isHave) {
                    // 请求培训班年度计划api
                    this.trainingClassApi.getAnnualPlan().subscribe(
                        annplanres => {
                            // console.log(annplanres, 4444)
                            let objparams = {
                                ...value
                            }
                            let annplanId = annplanres.annualPlan
                            this.trainingClassApi.createAnnualPlan(value, annplanId).subscribe(
                                ok => {
                                    this.tipMessage('success', '添加培训班成功！');
                                    this.loading = false;
                                    this.toList();
                                },
                                err => {
                                    this.tipMessage('error', '添加培训班失败');
                                    this.loading = false;
                                }
                            );
                        },
                        error => {
                            this.loading = false;
                            return this.tipMessage('error', error);
                        }
                    )
                } else {
                    this.loading = false;
                    return this.tipMessage('error', '请先在您当前组织下创建年度计划', 5000);
                }
            },
            err => {
                this.loading = false;
                return this.tipMessage('error', err);
            }
        )
    }

    onCancel(event) {

        this.toList();
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
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
