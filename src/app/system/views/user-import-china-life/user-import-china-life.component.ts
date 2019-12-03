import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserChinaLifeService } from '../../service/user-china-life.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-user-import-china-life',
    templateUrl: './user-import-china-life.component.html',
    styleUrls: ['./user-import-china-life.component.scss']
})
export class UserImportChinaLifeComponent implements OnInit {

    stepChooseFileValid = false;
    stepDoImportValid = false;
    errorValid = false;
    loading: boolean = false;
    parsedData;
    columns;
    taskKey;
    importedUsers;
    errUsers: any[] = [];
    userGroupId;



    progress = 0;

    constructor(
        private userService: UserChinaLifeService,
        private router: Router,
        private route: ActivatedRoute) {
        this.userGroupId = this.route.snapshot.queryParams.userGroupId;
        this.columns = [
            { title: '序号', data: 'orderNumber' },
            { title: '用户名', data: 'username' },
            { title: '姓名', data: 'displayName' },
            { title: '手机号', data: 'phoneNumber' },
            { title: '电子邮箱', data: 'email' },
            { title: '人员类型', data: 'userTypes' },
            { title: '身份证号', data: 'cardNumbers' },

        ];
    }

    ngOnInit() {
    }

    onUploadComplete(fileInfo) {
        this.stepChooseFileValid = true;
        this.taskKey = fileInfo['taskKey'];
        this.getImportProgress();
    }

    onPrevClick(stepIndex) {
        if (stepIndex == 3) {
            this.userService.import(this.taskKey, this.userGroupId).subscribe(
                users => {
                    if (users) {
                        this.stepDoImportValid = true;
                        this.importedUsers = users;
                        this.importedUsers.map((item, index) => {
                            this.errUsers.push(item.importUserDto);
                        })

                    };
                    if (users.length > 0) {
                        this.errorValid = true;
                    }
                },
                error => { console.log(error) }
            );
        }
    }

    goBack() {
        this.router.navigate(['../', 'list'], { relativeTo: this.route });
    }

    getImportProgress() {
        this.userService.importProgress(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                } else {
                    this.parsedData = m['parsedData'];
                    if (!this.parsedData) {
                        this.getImportProgress();
                    }
                }
            }
        );
    }

    // 导出错误信息
    exportErro() {
        this.userService.exportErroUser(this.importedUsers).subscribe(
            ok => {
                this.userService.exportdownload();
            },
            err => {
                tipMessage('数据加载异常', 'error');
            }
        );


    }

    //模板下载
    download() {
        this.userService.download();
    }

}
