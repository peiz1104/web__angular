import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NzMessageService } from 'ng-zorro-antd';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { AccountService } from 'app/account/service/account.service';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';

@Component({
    selector: 'spk-paper-all-import',
    templateUrl: './paper-all-import.component.html',
    styleUrls: ['./paper-all-import.component.scss']
})
export class PaperAllImportComponent implements OnInit {
    radioValue = 'N'; // 默认不发布
    publishStateValue = 'N'; // 导入的试卷是否发布
    chooseFile: any = ''; // 上传文件
    inputUploadValue: any;
    filename: any;
    treeConfig: any; // 树组件异步加载子数据配置
    nodesTree: any = [{ id: '', label: '全部', selected: true, expanded: true, hasChildren: true }]; // 分类树数据
    errorList: any[] = [];
    isLoading: boolean = false;
    xhr: any;
    knowledgeId: any;
    isVisible: boolean = false;
    managerGroup: any = {};
    _selectTreeId: any; // 当前选择分类树id
    knowledgeIdVisible: boolean = false;
    selectName: any;
    queryParams: any = {}
    errorResolve: any = [];
    link: any = {};
    fileType: string = 'EXCEL';
    isShowProess: boolean = false;
    uploadObj: any = {
        stageMessager: "上传中",
        endNum: "0",
        errorObj: []
    };
    proessNum: number = 0;
    flag: string = "0";
    interval: any;
    timeout: any;
    dicTypeList: any = [];
    isShowDesc: boolean = false;
    get selectTreeId() {
        return this._selectTreeId;
    }

    set selectTreeId(v) {
        this._selectTreeId = v;
    }

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private nzMessageService: NzMessageService,
        private accountInfoService: AccountService,
        private testQuestionService: TestQuestionService,
        private examPaperService: ExamPaperService
    ) { }

    @Output() importTest: any = new EventEmitter<string>();

    ngOnInit() {
        this.queryParams = this.routeInfo.snapshot.params;
        this.managerGroup = {
            id: this.queryParams.userGroupId,
            name: this.queryParams.name
        }
        this.link = {
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        }
        this.testQuestionService
            .getDictionaries({ dicType: "QUESTION_TYPE_UPLOAD" })
            .subscribe(data => {
                data.map(item => {
                    this.dicTypeList.push(item.dicCode);
                });
                this.fileType = this.dicTypeList[0];
            });
    }

    onNodeSelect(e) {// 树组件选择事件，获取当前选择树节点id
        if (e.node.id) {
            this.selectTreeId = e.node.data.id;
            this.selectName = e.node.data.label;
            this.changeValue();
        }
    }

    getTreeData = () => {
        this.testQuestionService.getParentNodes({ userGroupId: this.managerGroup.id }).subscribe(nodes => {// 获取父分类api
            this.nodesTree[0].children = this.formatTreeData(nodes);
        });
        this.treeConfig = {
            async: {
                enable: true,
                loadChildren: (node: any): Observable<any> => {// 异步加载子分类数据
                    if (!node.id) {// id为空不加载子数据
                        return Observable.of(null);
                    }
                    return this.testQuestionService.getChildNodes({ parentId: node.id }); // 获取子分类api
                },
                dataFilter: (tree, node: any) => {// 渲染加载的子分类数据
                    let data = [];
                    // tslint:disable-next-line:no-unused-expression
                    tree && tree.forEach(obj => {
                        data.push({ "id": obj.knowledgeId, "label": obj.qkName, "hasChildren": true });
                    });
                    return data;
                }
            },
            data: {// 获取数据 key对象的value值为获取数据api里面的属性名
                key: {
                    id: 'id',
                    label: 'label',
                    children: 'children'
                }
            }
        };
    }

    formatTreeData(tree) {// 格式化父分类树数据
        let data = [];
        tree.forEach((obj, index) => {
            data.push({ "id": obj.knowledgeId, "label": obj.qkName, "hasChildren": true });
        });
        return data;
    }

    // 试卷模板显示
    papershowmodel($event) {
        $event.preventDefault();
        this.isShowDesc = !this.isShowDesc;
    }

    handleOk = (e) => {
        this.isVisible = false;
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }

    // uploadComplete = (evt) => {
    //     let json = evt.target.responseText && JSON.parse(evt.target.responseText);
    //     this.errorList = Array.isArray(json) ? json : [];
    //     if (json.message) {
    //         this.isLoading = false;
    //         this._message.warning(json.message);
    //     } else {
    //         if (this.errorList.length == 0) {
    //             this._message.success('导入成功');
    //             this.importTest.emit();
    //             this.isLoading = false;
    //         } else {
    //             let errorResolve = [];
    //             this.errorList.forEach(ele => {
    //                 let errMap = [];
    //                 // tslint:disable-next-line:forin
    //                 for (let key in ele.errMap) {
    //                     errMap.push({
    //                         key: key + '列' + ele.errMap[key]
    //                     })
    //                 }
    //                 errorResolve.push({
    //                     excelRow: ele.excelRow,
    //                     sheetName: ele.sheetName,
    //                     errMap: [...errMap]
    //                 })
    //             });
    //             this.errorResolve = [...errorResolve];
    //             this.isLoading = false;
    //         }
    //     }
    // }

    uploadComplete = evt => {
        let json = evt.target.responseText && JSON.parse(evt.target.responseText);
        if (json.error) {
            this.uploadObj.errorMsg = json.message;
            if (this.interval) {
                clearInterval(this.interval);
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.isShowProess = false;
            this.isLoading = false;
        }
    };

    changeValue = () => {

        this.isShowProess = false;
        this.isLoading = false;
        this.uploadObj = {
            stageMessager: "上传中",
            endNum: "0",
            errorObj: []
        };
    };

    // 拿到文件
    changeFile = (file) => {
        this.inputUploadValue = file.target.files[0];
        this.filename = file.target.files[0].name;
        this.changeValue();
    }

    logSelectGroup = (e) => {
        this.changeValue();
    }

    // 点击导入时的操作
    // submitForm = (event) => {
    //     if (this.inputUploadValue) {
    //         this.isLoading = true;
    //         this.xhr = new XMLHttpRequest();
    //         let fd = new FormData();
    //         let flag = this.radioValue == 'Y';
    //         fd.append("upfile", this.inputUploadValue); // 文件追到到FormData
    //         fd.append("isSaveQue", flag + ""); // 文件追到到FormData
    //         if (!this.managerGroup) {
    //             this.isLoading = false;
    //             return this._message.error('请选择组织！')
    //         } else {
    //             fd.append("userGroupId", this.managerGroup.id); // 文件追到到FormData
    //             fd.append("fileType", this.fileType); // 文件追到到FormData
    //             if (this.radioValue == 'Y') {
    //                 if (this.selectTreeId) {
    //                     fd.append("knowledgeId", this.selectTreeId); // 文件追到到FormData
    //                 } else {
    //                     this.isLoading = false;
    //                     return this._message.error('请选择分类！')
    //                 }
    //             }
    //             this.xhr.addEventListener("load", this.uploadComplete, true);
    //             this.xhr.open("POST", '/api/exam/paper/import', true);
    //             this.xhr.send(fd);
    //             this.route.navigate(['/exam/exam-paper'], {
    //                 queryParams: {
    //                     userGroupId: this.queryParams['userGroupId'],
    //                     name: this.queryParams['name']
    //                 }
    //             });
    //         }
    //     } else {
    //         return this._message.error('请选择要上传的文件！')
    //     }
    // }

    getProess = () => {
        if (!this.isLoading) {
            return;
        }
        this.examPaperService
            .getUploadProess({ fileType: this.fileType, date: new Date().getTime() })
            .subscribe(
                data => {
                    if (this.uploadObj.errorMsg || this.uploadObj.errorObj.length > 0) {
                        if (this.interval) {
                            clearInterval(this.interval);
                        }
                        this.isShowProess = false;
                        this.isLoading = false;
                        return;
                    }
                    let msg = [];
                    if (data.errorObj && data.errorObj.length > 0) {
                        data.errorObj.forEach(item => {
                            let msgMap = [];
                            for (let key in item.errMap) {
                                msgMap.push({
                                    key: key + '列' + item.errMap[key]
                                })
                            }
                            msg.push({
                                excelRow: item.excelRow,
                                sheetName: item.sheetName,
                                errMap: [...msgMap]
                            })
                        })
                    }
                    data.errorObj = msg;
                    this.uploadObj = data;
                    console.log('uploadObj:', this.uploadObj)
                    console.log('proessNum:', this.proessNum)
                    if (data.endNum) {
                        // 有返回信息
                        if (this.interval) {
                            clearInterval(this.interval);
                        }
                        const add = (data.endNum - this.proessNum) / 10;
                        let i = 0;
                        this.interval = setInterval(() => {
                            if (i >= 10) {
                                this.proessNum = data.endNum;
                                if (data.endNum >= 100) {
                                    this.isLoading = false;
                                    this.uploadObj.errorObj = data.errorObj || [];
                                    if (this.uploadObj.errorObj.length == 0) {
                                        this.nzMessageService.success("导入成功！");
                                    }
                                }
                                if (this.interval) {
                                    clearInterval(this.interval);
                                }
                            } else {
                                this.proessNum = this.proessNum + add;
                            }
                            i++;
                        }, 500);
                        if (data.endNum < 100) {
                            setTimeout(this.getProess, 5000);
                        }
                    } else {
                        // this.uploadObj.errorMsg = "系统错误，请联系管理员!";
                        // this.isLoading = false;
                        setTimeout(this.getProess, 5000);
                    }
                },
                error => {
                    this.uploadObj.errorMsg = error.message;
                    this.isLoading = false;
                }
            );
    };

    submitForm = (event) => {
        if (this.inputUploadValue) {
            this.xhr = new XMLHttpRequest();
            this.isLoading = true;
            this.isShowProess = false;
            setTimeout(() => {
                this.isShowProess = true;
            }, 0);
            this.uploadObj = {
                stageMessager: "上传中",
                endNum: "0",
                errorObj: []
            };
            let flag = this.radioValue == 'Y';
            this.proessNum = 0;
            let fd = new FormData();
            fd.append("upfile", this.inputUploadValue); // 文件追到到FormData
            if (this.radioValue == 'Y') {
                if (this.selectTreeId) {
                    fd.append("knowledgeId", this.selectTreeId); // 文件追到到FormData
                } else {
                    this.isLoading = false;
                    this.isShowProess = false;
                    return this.nzMessageService.error('请选择分类！')
                }
            }
            fd.append("isSaveQue", flag + ""); // 文件追到到FormData
            fd.append("userGroupId", this.managerGroup.id); // 文件追到到FormData
            fd.append("fileType", this.fileType); // 文件追到到FormData
            // fd.append("date", new Date().getTime() + "");
            this.xhr.open("POST", '/api/exam/paper/import', true);
            this.xhr.send(fd);
            this.xhr.addEventListener("error", this.uploadComplete, true);
            this.xhr.addEventListener("load", this.uploadComplete, true);
            this.timeout = setTimeout(this.getProess, 2000);
            // this.route.navigate(['/exam/exam-paper'], {
            //     queryParams: {
            //         userGroupId: this.queryParams['userGroupId'],
            //         name: this.queryParams['name']
            //     }
            // });
        } else {
            return this.nzMessageService.error('请选择要上传的文件！')
        }
    }

    // 展现模态框
    showModal = () => {
        this.knowledgeIdVisible = true;
        this.getTreeData();
    }

    handleKnowOk = () => {
        this.knowledgeIdVisible = false;
    }

    handleKnowCancel = () => {
        this.knowledgeIdVisible = false;
    }

    showDesc() {
        // 查看模板说明
        this.isShowDesc = !this.isShowDesc;
    }
}
