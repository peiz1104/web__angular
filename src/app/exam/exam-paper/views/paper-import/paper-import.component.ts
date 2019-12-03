import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-import',
    templateUrl: './paper-import.component.html',
    styleUrls: ['./paper-import.component.scss']
})
export class PaperImportComponent implements OnInit {
    queryParams: any;
    isVisible: boolean = false;
    radioValue: any = 'Y'; // 试题是否存入试题库
    radioPValue: any = 'Y'; // 试题是否发布
    inputUploadValue: any = ''; // 上传文件名称
    uploadParams: any = {}; // 上传参数对象
    errorList: any[] = [];
    xhr: any;
    isLoading: boolean = false;
    errorResolve: any = [];
    fileType: string = 'EXCEL';
    link: any = {};

    @Output() importTest: any = new EventEmitter<string>();

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.queryParams = this.routeInfo.snapshot.params;
        this.link = {
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        }
    }
    // 模板说明详述modal
    testimportexplain = (event) => {
        this.isVisible = true;
    }
    // 模板态框的关闭
    handleOk = (e) => {
        this.isVisible = false;
    }

    uploadComplete = (evt) => {
        let json = evt.target.responseText && JSON.parse(evt.target.responseText);
        this.errorList = Array.isArray(json) ? json : [];
        if (json.message) {
            this.isLoading = false;
            tipMessage(json.message);
        } else {
            if (this.errorList.length == 0) {
                tipMessage('导入成功', 'success');
                this.importTest.emit();
                this.isLoading = false;
                this.goBack();
            } else {
                let errorResolve = [];
                this.errorList.forEach(ele => {
                    // tslint:disable-next-line:forin
                    errorResolve.push({
                        excelRow: ele.excelRow,
                        errMsg: ele.errorKey + '列' + ele.errorMsg
                    })
                });
                this.errorResolve = [...errorResolve];
                this.isLoading = false;
            }
        }
    }

    // 返回上一页
    goBack = () => {
        this.route.navigate([`/exam/exam-paper/editpaper/${this.queryParams['paperId']}/addtest`, {
            epId: this.queryParams['paperId'],
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        }]);
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    // 拿到文件
    changeFile = (file) => {
        // this.inputUploadValue = '';
        this.inputUploadValue = file.target.files[0];
        // let fileType = file.target.value;
        // if (fileType.indexOf('xls') != -1) {
        //     this.inputUploadValue = file.target.files[0];
        // } else {
        //     this._message.error('请上传excel文件！')
        // }
    }
    // 点击导入时的操作
    importopear = (event) => {
        if (this.inputUploadValue) {
            this.isLoading = true;
            this.xhr = new XMLHttpRequest();
            let fd = new FormData();
            fd.append("file", this.inputUploadValue); // 文件追到到FormData
            fd.append("partitionId", this.queryParams.partitionId);
            fd.append("fileType", this.fileType); // 文件追到到FormData
            this.xhr.addEventListener("load", this.uploadComplete, true);
            this.xhr.open("POST", '/api/exam/paper/part/question/import', true);
            this.xhr.send(fd);
        } else {
            return tipMessage('请选择要上传的文件！')
        }
    }
}
