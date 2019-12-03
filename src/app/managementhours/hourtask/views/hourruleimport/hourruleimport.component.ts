import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { NzMessageBaseService } from 'ng-zorro-antd/src/message/nz-message.service';
declare let $: any;
@Component({
    selector: 'spk-hourruleimport',
    templateUrl: './hourruleimport.component.html',
    styleUrls: ['./hourruleimport.component.scss']
})
export class HourruleimportComponent implements OnInit {
    nowYear: any;
    ruleId: any;
    current = 0;
    loading: boolean = false;
    importErrInfo: any;
    taskKey: string;
    progress = 0;
    parsedData;
    status: string;
    errorList: any[] = [];
    rightList: any[] = [];
    importOkData: any;
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private _message: NzMessageService,
        private confrim: NzModalService,
        private service: HourService
    ) { }

    ngOnInit() {
        this.routeInfo.params.subscribe(
            params => {
                this.ruleId = params.ruleId;
                this.nowYear = params.nowYear;
            }
        )
    }
    pre() {
        this.current -= 1;
    }

    next() {
        if (this.current == 0 && !this.status) {
            return $.toast({
                icon: 'error',
                text: '请上传文件',
                position: 'top-center',
                allowToastClose: false,
                hideAfter: 1000
            });
        }
        if (this.current == 0 && this.status == 'progressfail') {
            return this.tipMessage('error', '文件上传解析失败', 5000)
        }
        if (this.current == 0 && this.status == 'before') {
            return this.tipMessage('error', '上传文件解析校验中,请稍后', 5000);
        }
        if (this.current == 0 && this.status == 'checkfail') {
            return this.tipMessage('error', '文件校验失败');
        }
        if (this.current == 1 && this.status == 'importfail') {
            return this.tipMessage('error', '导入失败');
        }
        if (this.current == 1 && this.rightList.length == 0) {
            return this.tipMessage('error', '模板信息填写错误不可导入，正确填写后进行上传', 5000);
        }
        if (this.current == 1 && this.rightList.length && this.status != 'after') {
            this.import();
        }
        if (this.current == 1 && this.loading) {
            return;
        }
        this.current += 1;
    }

    done() {
        this.router.navigate(['../', 'viewrule'], { relativeTo: this.routeInfo })
        this.tipMessage('success', '导入成功');
    }
    initImport(fileupload) {
        console.log(fileupload);

        this.importErrInfo = undefined;
        if (fileupload) {
            this.importErrInfo = undefined;
            this.taskKey = fileupload['taskKey'];
            this.getImportProgress();

        } else {
            this.importErrInfo = fileupload.mes;
        }
    }
    getImportProgress() {
        this.service.importProgressPeriodRule(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    // this.interval = setInterval(this.getImportProgress, 1000)
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                    this.status = 'before'
                } else {
                    this.parsedData = m['parsedData'];
                    if (this.progress == 100) {
                        this.checkExcel();
                    }
                }
            },
            error => {
                this.status = 'progressfail'
            }
        );
    }
    // 检测文件是否正确
    checkExcel() {
        this.service.importCheckExcelPeriodRule(this.taskKey).subscribe(
            res => {
                console.log(res);
                this.status = 'next';
                this.importErrInfo = undefined;
                this.errorList = res.err;
                this.rightList = res.right;
            },
            err => {
                this.status = 'checkfail';
                this.importErrInfo = '文件校验失败'
            }
        )
    }
    import() {
        this.loading = true;
        this.service.importPeriodRule(this.taskKey, this.ruleId, this.nowYear).subscribe(
            res => {
                console.log(res, 123)
                if (res.length !== 0) {
                    this.importOkData = res;
                    this.status = 'after';
                    this.loading = false;
                    this.current = 2;
                    this.tipMessage('success', '导入成功！', 1000)
                }
            },
            err => {
                this.status = 'importfail';
                this.loading = false;
                this.current = 1;
                this.tipMessage('error', '导入失败', 1000)
            }
        )
    }
    // tipmethod
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
