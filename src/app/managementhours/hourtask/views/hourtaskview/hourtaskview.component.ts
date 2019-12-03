import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagination } from 'app/core';
import { AuthService } from 'app/core';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
    selector: 'spk-hourtaskview',
    templateUrl: './hourtaskview.component.html',
    styleUrls: ['./hourtaskview.component.scss']
})
export class HourtaskviewComponent implements OnInit {
    _searchForm: FormGroup;
    validateForm: FormGroup;
    hourYear: any;
    hourId: any;
    isCarryOver: any;
    spinning: boolean = false;
    testListData: any;
    selection: any = [];
    isVisible: boolean = false;
    userId: any;
    userPeriod: any;
    submitLoading: boolean = false;
    isVisibleImportant: boolean = false;
    btnimportstate: boolean = false;
    taskKey: string;
    progress = 0;
    parsedData;
    messageImportant?: any;
    status: string;
    messageShow: boolean;
    messageColumns = [
        { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    searchBy: {
        userGroupId?: any,
        username?: any,
        displayName?: any
    } = {}
    columns: any = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName', styleClass: 'text-left fix-width' },
        { title: '组织', tpl: 'usergroup' },
        { title: '学时', data: 'periodTaskNumber', styleClass: 'text-right' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: HourService,
        private fb: FormBuilder,
        private authService: AuthService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.routeInfo.paramMap.subscribe(
            data => {
                this.hourId = data.get('hourId');
                this.hourYear = data.get('hourYear');
            }
        )
        this.routeInfo.queryParamMap.subscribe(
            params => {
                this.isCarryOver = params.get('isCarryOver')
                // console.log(typeof (this.isCarryOver))
            }
        )
        this.initSearchForm();
        this.authService.getCurrentUser().subscribe(
            user => {
                // console.log(user)
                if (user.managerGroup) {
                    this.searchBy.userGroupId = [user.managerGroup.id];
                    this._searchForm.get('userGroupId').setValue([user.managerGroup])
                }
                this.loadData();
            }
        )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            username: [],
            displayName: [],
            userGroupId: [],
        });
    }
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            year: this.hourYear,
            taskId: this.hourId
        }
        // console.log(this._searchForm.value)
        if (this._searchForm.value) {
            if (this.searchBy.userGroupId) {
                if (Object.prototype.toString.call(this._searchForm.value.userGroupId) == "[object Object]") {
                    params['ugIds'] = this._searchForm.value.userGroupId.id;
                } else {
                    if (this.searchBy.userGroupId && this.searchBy.userGroupId[0].id) {
                        params['ugIds'] = this.searchBy.userGroupId.map(item => item.id)
                    } else {
                        params['ugIds'] = this.searchBy.userGroupId
                    }
                }

            }
            if (this._searchForm.value.username) {
                params['username'] = this._searchForm.value.username
            }
            if (this._searchForm.value.displayName) {
                params['displayName'] = this._searchForm.value.displayName
            }
        }
        // console.log(params)
        this.service.getYearHourList(params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )

    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        // console.log(this.searchBy, 2333)
        this.loadData();
    }

    allUpdate() {
        if (this.selection.length) {
            this.isVisible = true;
            this.validateForm = this.fb.group({
                periodNumber: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]]
            })
        } else {
            return tipMessage('请选择要更新的项');
        }
    }

    updatePeriod(value) {
        this.userId = value.user.id;
        this.userPeriod = value.periodTaskNumber;
        // console.log(value)
        this.isVisible = true;
        this.validateForm = this.fb.group({
            periodNumber: [value.periodTaskNumber, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]]
        })

    }



    submitForm(value) {
        if (this.userId) {
            if (value.periodNumber == this.userPeriod) {
                return tipMessage('更新学时不能和现有学时相同',  'error', 3000);
            }
            if (value.periodNumber == 0) {
                return tipMessage('要更新学时不能为0', 'error', 3000);
            }

        } else {
            if (value.periodNumber == 0) {
                return tipMessage('要更新学时不能为0', 'error', 3000);
            }
        }
        this.submitLoading = true;
        let params = {
            year: this.hourYear,
            periodNumber: value.periodNumber,
            ids: this.userId ? [this.userId] : this.getids(this.selection)
        }
        this.service.updatePeriod(params).subscribe(
            res => {
                tipMessage('更新学时成功！', 'success');
                this.restModal()
                this.loadData();
            },
            err => {
                tipMessage('更新失败');
                this.submitLoading = false;
            }
        )
    }
    restModal() {
        this.isVisible = false;
        this.userId = undefined;
        this.userPeriod = undefined;
        this.submitLoading = false;
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.restModal()
    }
    getfullNamePath(value) {
        if (value) {
            if (value.indexOf(',') !== -1 || value.indexOf('，') !== -1) {
                return value.replace(/(\,)|(\，)/g, '/')
            } else {
                return value
            }
        } else {
            return '--'
        }
    }
    getids(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.user.id)
        })
        return ids;
    }
    batchimport(event) {
        this.isVisibleImportant = true;
    }
    handleCancel(event) {
        this.isVisibleImportant = false;
        if (this.status == "success") {
            this.resteImportant();
            this.loadData();
        } else {
            this.resteImportant();
        }
    }
    handleOk(event) {
        this.isVisibleImportant = false;
        if (this.status == "success") {
            this.resteImportant();
            this.loadData();
        } else {
            this.resteImportant();
        }
    }

    onUploadComplete(fileupload) {
        if (fileupload) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();

            // console.log(fileupload, 3421)
        }
    }

    import() {
        this.status = 'importing';
        this.service.importHourTask(this.taskKey, this.hourYear).subscribe(
            errorList => {
                if (errorList.length !== 0) {
                    // console.log(111)
                    this.messageImportant = errorList;
                    tipMessage('导入失败');
                    this.status = 'after';
                    this.messageShow = true;
                } else {
                    tipMessage('导入成功', 'success');
                    this.status = 'success';
                    this.messageShow = false;
                    setTimeout(() => {
                        this.isVisibleImportant = false;
                        this.loadData();
                        this.resteImportant()
                    }, 3000)
                }
            }
        )
    }

    getImportProgress() {
        this.service.importProgressHourTask(this.taskKey).subscribe(
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
    resteImportant() {
        this.progress = 0;
        this.taskKey = undefined;
        this.parsedData = undefined;
        this.messageImportant = undefined;
        this.status = undefined;
        this.messageShow = false;
    }

}
