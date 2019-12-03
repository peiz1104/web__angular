import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-hourimport',
    templateUrl: './hourimport.component.html',
    styleUrls: ['./hourimport.component.scss']
})
export class HourimportComponent implements OnInit {
    uploadfile: any = undefined;
    btnimportstate: boolean = false;
    taskKey: string;
    progress = 0;
    parsedData;
    message?: any;
    status: string;
    messageShow: boolean;
    messageColumns = [
        { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    constructor(
        private hourservice: HourService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private _message: NzMessageService
    ) { }

    ngOnInit() {
        this.messageShow = false;
        this.message = [];
    }
    onUploadComplete(fileupload) {
        // console.log(fileupload, 2324);
        if (fileupload) {
            this.messageShow = false;
            this.message = [];
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();

            // console.log(fileupload, 3421)
        }
    }

    import() {
        this.status = 'importing';
        this.hourservice.import(this.taskKey).subscribe(
            errorList => {
                if (errorList.length !== 0) {
                    // console.log(111)
                    this.message = errorList;
                    tipMessage('导入失败');
                    this.status = 'after';
                    this.messageShow = true;
                } else {
                    // console.log(222)
                    tipMessage('导入成功', 'success');
                    this.status = 'success';
                    this.messageShow = false;
                    setTimeout(() => {
                        window.history.back()
                    }, 2000)
                }
            }
        )
    }

    getImportProgress() {
        this.hourservice.importProgress(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    // this.interval = setInterval(this.getImportProgress, 1000)
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


    // 返回到liebiaoye
    toList() {
        window.history.back()
    }
}
