import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ResearchService } from '../../../service/research.service';
import { TeacherImportError } from 'app/library/entity/teacher-import-error';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-user-teacher-import',
    templateUrl: './user-teacher-import.component.html',
    styleUrls: ['./user-teacher-import.component.scss']
})
export class UserTeacherImportComponent implements OnInit {


    pathId: number; // 年度计划id
    taskKey: string;
    progress = 0;
    parsedData;
    message?: TeacherImportError[];
    status: string;
    messageShow: boolean;

    messageColumns = [
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: ResearchService,
    ) { }

    ngOnInit() {
        this.messageShow = false;
        this.pathId = this.activatedRoute.snapshot.params.stepId;
        this.message = [];
    }

    onUploadComplete(fileupload) {
        if (fileupload) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();
        }
    }

    import() {
        this.status = 'importing';
        this.service.import(this.taskKey, this.pathId).subscribe(
            errorList => {
                this.message = errorList;
                tipMessage('导入成功', 'success');
                this.status = 'after';
                this.messageShow = true;
            }
        )
    }

    getImportProgress() {
        this.service.importProgress(this.taskKey, this.pathId).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
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

    download() {
        this.service.download(this.pathId);
    }

    toList() {
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

}
