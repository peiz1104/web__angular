import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HourService } from '../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-hourswitch',
    templateUrl: './hourswitch.component.html',
    styleUrls: ['./hourswitch.component.scss']
})
export class HourswitchComponent implements OnInit {
    _form: FormGroup;
    _searchForm: FormGroup;
    selectedOption;
    addbtnstate: boolean = false;
    openbtnstate: boolean = false;
    overbtnstate: boolean = false;
    spinning: boolean = false;
    testListData: any;
    isVisible: boolean = false;
    btnsubmit: boolean = false;
    nowDate: any = new Date().getFullYear();
    selection: any[] = [];
    siteid: any;
    switchValue: boolean = true;
    searchBy: {
        year?: any
    } = {}
    columns: any = [
        { title: '年份', data: 'year', styleClass: 'text-center' },
        { title: '开启', tpl: 'isOpen', styleClass: 'text-center' },
        { title: '结转', tpl: 'isCarryover', styleClass: 'text-center' },
        // { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]
    addisVisible: boolean = false;

    constructor(private fb: FormBuilder,
        private confirmServ: NzModalService,
        private hourservice: HourService,
        private message: NzMessageService) {
    }

    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.year) {
            params['year'] = this.searchBy.year;
        }
        this.hourservice.hourswitch(params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return $.toast({
                    iocn: 'error',
                    text: err,
                    hideAfter: 1000,
                    position: 'top-center',
                    allowToastClose: false,
                })
            }
        )
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            year: ['']
        })
        this.loadData();
        this.hourservice.getsiteId().subscribe(
            res => {
                // console.log(res, 33)
                this.siteid = res.currentSite.id;
            },
            err => {
                $.toast({
                    iocn: 'error',
                    text: err,
                    position: 'top-center',
                    hideAfter: 1000,
                    allowToastClose: false,
                })
            }
        )
    }
    // 搜索
    _submitForm(event, value) {
        this.searchBy = value;
        this.loadData()
    }
    // 进行结转
    isCarryover(event, row) {
        console.log(event, row);
        if (row.isOpen == 'true') {
            $.toast({
                iocn: 'error',
                text: '学时开关需要关闭后才能结转！',
                hideAfter: 1000,
                position: 'top-center',
                allowToastClose: false,
            })
            return;
        }
        let params = {
            // "isOpen": false,
            "isCarryover": true
        }
        // 结转
        let self = this;
        this.confirmServ.confirm({
            title: '结转',
            content: '年度学时任务结转后，本年度的学时情况将不能再更新，处于审批状态下的学时将会记录到下一年学时的学时任务！',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.isCarryover(row.year, params).subscribe(
                    res => {
                        self.loadData();
                        $.toast({
                            iocn: 'success',
                            text: '结转成功！',
                            position: 'top-center',
                            hideAfter: 1000,
                            allowToastClose: false,
                        })
                    },
                    err => {
                        self.loadData();
                        return $.toast({
                            iocn: 'error',
                            text: err,
                            position: 'top-center',
                            hideAfter: 1000,
                            allowToastClose: false,
                        })
                    }
                )
            },
            onCancel() {
                self.testListData.content = self.testListData.content.map((item, index) => {
                    if (item.id == row.id) {
                        item.isCarryover = 'false'
                    }
                    return item;
                })
                self.loadData();
            }
        });
    }

    // 开启
    isOpen(row) {
        console.log(row);
        if (row.isRunable == true) {
            $.toast({
                iocn: 'error',
                text: `${row.year}年份的学时正在结转，不可重复操作`,
                hideAfter: 5000,
                position: 'top-center',
                allowToastClose: false,
            })
            return;
        }
        if (row.isCarryover == 'true') {
            $.toast({
                icon: 'error',
                text: `学时已经结转不可再开启${row.year}年份的`,
                hideAfter: 5000,
                position: 'top-center',
                allowToastClose: false,
            })
            return;
        }
        let params = {
            isOpen: true,
            year: row.year,
        }
        // 结转
        let self = this;
        this.confirmServ.confirm({
            title: '开启',
            content: '是否同时开启年度学时任务管理？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.isCarryover(row.year, params).subscribe(
                    res => {
                        self.loadData();
                        self.message.success('开启成功！');
                    },
                    err => {

                        return self.message.error(err)
                    }
                )
            },
            onCancel() {
                self.loadData()
            }
        });
    }

    // 关闭
    isClose(row) {
        let params = {
            isOpen: false,
            year: row.year,
        }
        // 结转
        let self = this;
        this.confirmServ.confirm({
            title: '关闭',
            content: '关闭后将不可再录入' + row.year + '年的学时！',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.isCarryover(row.year, params).subscribe(
                    res => {
                        self.loadData();
                        self.message.success('关闭成功！');
                    },
                    err => {

                        return self.message.error(err)
                    }
                )
            },
            onCancel() {
                self.loadData()
            }
        });
    }

    // 添加
    addyear(event, type) {
        this._form = this.fb.group({
            year: [this.nowDate]
        })
        this.isVisible = true;
    }

    // 关闭弹窗
    handleCancel(event) {
        this.isVisible = false;
    }

    // baocun
    _saveformmessage(event, value) {
        console.log(value);
        if (value.year) {
            this.hourservice.findOnePeriodswitchByYear(value.year).subscribe(
                res => {
                    console.log(value.year)
                    if (res == null || res.year == null) {
                        this.addbtnstate = true;
                        let params = {
                            "year": value.year,
                            "isOpen": true,
                            "site": {
                                "id": this.siteid
                            },
                            "isCarryover": false
                        }
                        this.hourservice.addpriodswitch(params).subscribe(
                            success => {
                                this.addbtnstate = false;
                                this.loadData();
                                this.isVisible = false;
                                $.toast({
                                    icon: 'success',
                                    text: '添加成功！',
                                    position: 'top-center',
                                    allowToastClose: false
                                })
                            },
                            err => {
                                this.addbtnstate = false;
                                return $.toast({
                                    icon: 'error',
                                    text: err,
                                    position: 'top-center',
                                    allowToastClose: false
                                })
                            }
                        );
                    } else {
                        this.addbtnstate = false;
                        $.toast({
                            icon: 'error',
                            text: '当前年份的学时开关已经创建，不可重复创建！',
                            allowToastClose: false,
                            position: 'top-center',
                            hideAfter: 5000,
                        })
                    }
                },
                error2 => {
                    this.addbtnstate = false;
                    return $.toast({
                        icon: 'error',
                        position: 'top-center',
                        text: error2,
                        allowToastClose: false,
                    })
                }
            );
        } else {
            return $.toast({
                icon: 'error',
                text: '请选择年份',
                position: 'top-center',
                allowToastClose: false,
            })
        }

    }

    // 默认提交当前年份
    submitform() {
        // console.log(this._form.value);
        if (this.btnsubmit) {
            return null
        }
        ;
        if (this._form.value.year) {
            this.hourservice.findOnePeriodswitchByYear(this._form.value.year).subscribe(
                res => {
                    console.log(this._form.value.year)
                    if (res == null || res.year == null) {
                        let params = {
                            "year": this._form.value.year,
                            "isOpen": false,
                            "site": {
                                "id": this.siteid
                            },
                            "isCarryover": false
                        }
                        this.btnsubmit = true;
                        this.hourservice.addpriodswitch(params).subscribe(
                            success => {
                                this.loadData();
                                this.isVisible = false;
                                this.btnsubmit = false;
                                $.toast({
                                    icon: 'success',
                                    text: '添加成功！',
                                    position: 'top-center',
                                    allowToastClose: false,
                                })

                            },
                            err => {
                                this.btnsubmit = false;
                                return $.toast({
                                    icon: 'error',
                                    text: err,
                                    position: 'top-center',
                                    allowToastClose: false,
                                })
                            }
                        );
                    } else {
                        $.toast({
                            icon: 'error',
                            text: '当前年份学时开关已经创建，不可重复创建！',
                            allowToastClose: false,
                            position: 'top-center',
                            hideAfter: 5000
                        })
                    }
                },
                error2 => {
                    this.btnsubmit = false;
                    return $.toast({
                        icon: 'error',
                        position: 'top-center',
                        text: error2,
                        allowToastClose: false,
                    })
                })
        } else {
            return $.toast({
                icon: 'error',
                text: '请选择年份！',
                position: 'top-center',
                allowToastClose: false,
            })
        }


    }
    changeCarryover(value) {
        console.log(value);
    }
}
