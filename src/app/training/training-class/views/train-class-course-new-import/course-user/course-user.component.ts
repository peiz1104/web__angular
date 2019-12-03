import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferingCourseApiService } from './../../../../service/offering-course-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-user',
    templateUrl: './course-user.component.html',
    styleUrls: ['./course-user.component.scss']
})
export class CourseUserComponent implements OnInit {
    current = 0;
    classId: any;
    courseIds: any;
    loading: boolean = false;
    importErrInfo: any;
    taskKey: string;
    progress = 0;
    parsedData;
    status: string;
    errorList: any[] = [];
    rightList: any[] = [];
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private offeringCourseApi: OfferingCourseApiService
    ) { }

    ngOnInit() {
        this.routeInfo.parent.params.subscribe(
            (res) => {
                this.classId = res.tbcId;
            }
        )
        // console.log(window.localStorage.getItem('importArray'))
        this.courseIds = JSON.parse(window.localStorage.getItem('importArray'))
        console.log(this.courseIds)
    }
    // 模板下载
    handelClickExport(exportType) {
        let data = {
            courseIds: this.courseIds,
            classId: this.classId
        }
        this.offeringCourseApi.export(data, exportType).subscribe(
            dat => {
                // console.log(dat)
                this.offeringCourseApi.download(exportType)
            },
            err => {
                tipMessage('模板下载失败');
            }
        );
    }
    pre() {
        this.current -= 1;
    }

    next() {
        if (this.current == 0 && !this.status) {
            return tipMessage('请上传文件');
        }
        if (this.current == 0 && this.status == 'before') {
            return tipMessage('上传文件校验中,请稍后');
        }
        if (this.current == 0 && this.status == 'checkfail') {
            return tipMessage('文件校验失败');
        }
        if (this.current == 1 && this.status == 'importfail') {
            return tipMessage('导入失败');
        }
        if (this.current == 1 && this.rightList.length == 0) {
            return tipMessage('模板信息填写错误不可导入，正确填写后进行上传', '', 5000);
        }
        if (this.current == 1 && this.rightList.length && this.status != 'after') {
            this.import();
        }
        if (this.current == 1 && this.loading) {
            return tipMessage('正在导入', 'warning');
        }
        this.current += 1;
    }

    done() {
        window.localStorage.removeItem('importArray');
        this.router.navigate(['../'], { relativeTo: this.routeInfo })
    }

    changeContent() {
        switch (this.current) {
            case 0: {

                break;
            }
            case 1: {

                break;
            }
            case 2: {

                break;
            }
            default: {

            }
        }
    }
    initImport(fileupload) {
        console.log(fileupload);

        this.importErrInfo = undefined;
        if (fileupload.isFinish) {
            this.importErrInfo = undefined;
            this.taskKey = fileupload['taskKey'];
            this.getImportProgress();

        } else {
            this.importErrInfo = fileupload.mes;
        }
    }
    getImportProgress() {
        this.offeringCourseApi.importProgressUser(this.taskKey).subscribe(
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
                    if (!this.parsedData) {
                        this.getImportProgress();
                    } else {
                        this.checkExcel();
                    }
                }
            }
        );
    }
    // 检测文件是否正确
    checkExcel() {
        this.offeringCourseApi.importCheckExcelUser(this.taskKey).subscribe(
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
        this.offeringCourseApi.importUser(this.taskKey, this.classId).subscribe(
            res => {
                console.log(res, 123)
                if (res.length !== 0) {
                    this.status = 'after';
                    this.loading = false;
                    this.current = 2;
                    tipMessage('导入成功', 'success');
                }
            },
            err => {
                this.status = 'importfail';
                this.loading = false;
                this.current = 1;
                tipMessage('导入失败');
            }
        )
    }
}
