import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TrainingPlanService } from './../../service/trainingplan.service';
import { ImportMessage } from '../../../../annualplan/entity/importmessage';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-trainingplan-import',
    templateUrl: './trainingplan-import.component.html',
    styleUrls: ['./trainingplan-import.component.scss']
})
export class TrainingPlanImportComponent implements OnInit {

    annualPlanId: number; // 年度计划id
    fullPath: string; // 文件完整路径
    status: string; // 上传文件状态
    message?: ImportMessage[]; // 解析上传的指定计划excle错误信息
    messageShow: boolean; // 是否显示错误信息列表
    messageColumns = [
        { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private trainingPlanService: TrainingPlanService
    ) { }

    ngOnInit() {
        this.annualPlanId = this.activatedRoute.snapshot.params.id;
        this.messageShow = false;
        this.message = [];
    }

    onUploadComplete(fileupload) {
        if (fileupload) {
            this.fullPath = fileupload.fullPath;
            this.status = "before";
        }
    }

    import() {
        this.trainingPlanService.import(this.annualPlanId, this.fullPath).subscribe(
            map => {
                if (map.isException) {
                    if (map.isFinsh) {
                        tipMessage(map.mes, 'success');
                        this.status = "after";
                        this.toList();
                    } else {// 验证数据错误
                        tipMessage(map.mes)
                        this.messageShow = true;
                        this.message = map.errorList;
                    }
                } else {// 异常
                    tipMessage(map.mes);
                }
            }
        )
    }

    download() {
        this.trainingPlanService.download('designatedplan');
    }

    toList() {
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }
}
