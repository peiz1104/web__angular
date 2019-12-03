import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
declare let $: any;
@Component({
    selector: 'spk-hournewimport',
    templateUrl: './hournewimport.component.html',
    styleUrls: ['./hournewimport.component.scss']
})
export class HournewimportComponent implements OnInit {
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
    failmessage: any; // 解析失败提示
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: HourService,
        private _message: NzMessageService
    ) { }

    ngOnInit() {
    }
    pre() {
        this.current -= 1;
    }

    next() {
        if (this.current == 0 && !this.status) {
            return this.tipMessage('error', '请上传文件');
        }
        if (this.current == 0 && this.status == 'ansyfail') {
            return this.tipMessage('error', '文件解析失败', 3000);
        }
        if (this.current == 0 && this.status == 'progressfail') {
            return this.tipMessage('error', '文件上传解析失败！', 5000);
        }
        if (this.current == 0 && this.status == 'before') {
            return this.tipMessage('error', '上传文件解析校验中,请稍后', 5000);
        }
        if (this.current == 0 && this.status == 'checkfail') {
            return this.tipMessage('error', '文件校验失败！', 3000);
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
        this.router.navigate(['../'], { relativeTo: this.routeInfo })
    }
    initImport(fileupload) {
        console.log(fileupload);

        this.importErrInfo = undefined;
        if (fileupload) {
            this.importErrInfo = undefined;
            this.taskKey = fileupload['taskKey'];
            this.getImportProgress();
            this.failmessage = undefined;
            this.status = undefined;
        } else {
            this.importErrInfo = fileupload.mes;
        }
    }
    getImportProgress() {
        this.service.importProgressPeriod(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    // this.interval = setInterval(this.getImportProgress, 1000)
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                    this.status = 'before'
                } else {
                    if (m.status == 'false') {
                        this.status = 'ansyfail';
                        this.failmessage = m.msg;
                    } else {
                        this.parsedData = m['parsedData'];
                        if (!this.parsedData) {
                            this.getImportProgress();
                        } else {
                            this.checkExcel();
                        }
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
        this.service.importCheckExcelPeriod(this.taskKey).subscribe(
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
        this.service.importPeriod(this.taskKey).subscribe(
            res => {
                console.log(res, 123)
                if (res.length !== 0) {
                    this.importOkData = res;
                    this.status = 'after';
                    this.loading = false;
                    this.current = 2;
                    this.tipMessage('success', '导入成功！');
                }
            },
            err => {
                this.status = 'importfail';
                this.loading = false;
                this.current = 1;
                this.tipMessage('error', '导入失败！');
            }
        )
    }
    exporterrorfile() {
        this.service.exporterrorfile({ taskKey: this.taskKey }).subscribe(
            res => {
                console.log(res, 344)
                let params = {
                    fileName: '学时导入错误信息',
                    sessionName: res.sessionName
                }
                this.service.exportdownloaderror(params);
                this.tipMessage('success', '导出错误信息成功！');
            }
        )
    }
    downloadtemplate() {
        this.service.downloadhourfile().subscribe(
            res => {
                let params = {
                    fileName: '导入学时模板',
                    sessionName: res.sessionName
                }
                this.service.exportdownloaderror(params);
            }
        )
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
