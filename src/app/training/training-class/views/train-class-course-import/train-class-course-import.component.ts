import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OfferingCourseApiService } from './../../../service/offering-course-api.service';
import { element } from 'protractor';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-train-class-course-import',
    templateUrl: './train-class-course-import.component.html',
    styleUrls: ['./train-class-course-import.component.scss']
})
export class TrainClassCourseImportComponent implements OnInit {

    tbcId: number; // 培训班id
    taskKey: string;
    progress = 0;
    parsedData;
    message: any = [];
    status: string;
    messageShow: boolean;
    url: string = "/api/annualsubplan/validImportFile?exportType=P"
    messageColumns = [
        { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    singleValue = true;
    isBlock: boolean = true;
    isPuTong: boolean = true;
    radioValue: string = 'T';
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private annualSubPlanService: OfferingCourseApiService
    ) { }

    ngOnInit() {
        this.messageShow = false;
        console.log(111, this.activatedRoute.snapshot.params.tbcId);
        this.activatedRoute.params.subscribe((params) => {
            this.tbcId = params.tbcId;
        });
        this.message = [];
    }

    handelRadioChange = (e) => {
        console.log(this.radioValue)
        if (this.radioValue == "T") {
            this.isBlock = true;
        } else {
            this.isBlock = false;
        }
    }
    onUploadComplete(fileupload) {
        if (fileupload['isFinish']) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();
        } else {
            console.log('mes', fileupload['mes'])
            tipMessage(fileupload['mes']);
        }
    }

    import() {
        this.status = 'importing';
        this.annualSubPlanService.import(this.taskKey, this.tbcId, this.radioValue).subscribe(
            errorList => {
                this.message = errorList;
                tipMessage('导入完成', 'success');
                this.status = 'after';
                this.messageShow = true;
            }
        )

    }

    getImportProgress() {
        this.annualSubPlanService.importProgress(this.taskKey, this.radioValue).subscribe(
            m => {
                console.log(m['progress'])
                this.progress = m ? (m['progress'] || 0) : 0;
                //this.progress = m['progress']
                if (!this.progress || this.progress < 100) {
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                } else {
                    this.parsedData = m['parsedData'];
                    this.status = 'before';
                    if (!this.parsedData) {
                        this.getImportProgress();
                    }
                }
            }
        );
    }


}
