import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { UserGroup } from 'app/system/entity/user-group';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FeeTypeService } from 'app/system/service/fee-type-service';
import { Pagination } from 'app/core';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-fee-type',
    templateUrl: './fee-type.component.html',
    styleUrls: ['./fee-type.component.scss']
})
export class FeeTypeComponent implements OnInit {
    columns;
    id;
    data: Pagination<any>;
    _searchForm: FormGroup;
    pagination: CuiPagination;
    validateForm: FormGroup;
    selection: any[] = [];
    loading: boolean = true;
    isVisibleadd: boolean = false;
    editspinning: boolean = false;
    addsubmitloading: boolean = false;
    searchBy: {
        name?: string,
        code?: string,
    } = {};

    constructor(
        private modal: NzModalService,
        private dialog: CuiLayer,
        private router: Router,
        private fb: FormBuilder,
        private service: FeeTypeService,
        private route: ActivatedRoute
    ) {
        this.columns = [
            { title: '费用code', data: 'code', styleClass: 'text-left' },
            { title: '费用名称', data: 'name', styleClass: 'text-left' },
            { title: '创建人', data: 'createdByDisplayName', styleClass: 'text-left' },
            { title: '操作', tpl: 'actions', styleClass: 'text-right' },
        ];
    }



    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [''],
            code: [''],
        })
        this.loadData();
    }

    searchData(event, value) {
        this.searchBy = value;
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            sort: page && page.sort ? page.sort : '',
            name: this.searchBy.name ? this.searchBy.name : '',
            code: this.searchBy.code ? this.searchBy.code : '',
        };
        this.loading = true;
        this.service.pageList(params).subscribe(
            data => {
                this.pagination = data;
                this.data = data;
                this.loading = false;
            }

        );

    }

    deleteAll() {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            this.modal.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.delete(ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        error => {
                            return tipMessage(error, 'error');
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            return tipMessage('请选择删除的项！', 'error');
        }
    }


    delete(id) {
        let ids = [];
        ids.push(id);
        this.modal.confirm({
            title: '删除',
            content: '确定要删除吗？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.delete(ids).subscribe(
                    res => {
                        tipMessage('删除成功！', 'success');
                        this.loadData();
                    },
                    error => {
                        return tipMessage(error, 'error');
                    }
                )
            },
            onCancel() { }
        })
    }


    getIds(array?: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids
    }


    // 添加
    add() {
        this.isVisibleadd = true;
        this.validateForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
        })
    }

    // tianjiaWiFi弹窗的显示影藏
    handleCanceladd(event) {
        this.isVisibleadd = false;
        // this.addwifieditid = undefined;
    }
    handleOkadd(event) {
        this.isVisibleadd = false;
        // this.addwifieditid = undefined;
    }


    // 编辑WiFi管理
    edit(id) {
        // 获取edit的对应数
        this.editspinning = true;
        this.isVisibleadd = true;
        this.id = id;
        this.validateForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
        })
        this.service.getOne(id).subscribe(
            res => {
                this.validateForm = this.fb.group({
                    code: [res.code, [Validators.required]],
                    name: [res.name, [Validators.required]],
                })
                this.editspinning = false;
            },
            err => {
                return tipMessage(err, 'error');
            }
        )
    }



    // 提交添加
    submitForm(event, value) {
        let params = {
            ...value,
        }
        this.addsubmitloading = true;
        if (this.id) {
            // 编辑
            // 先进行名称是否已有的判断
            let paramsObjudge = {
                ...value,
                id: this.id
            }
            this.service.judgenamerepeat(paramsObjudge).subscribe(
                res => {
                    if (!res.codeFlag && !res.nameFlag) {
                        let paramsObj = {
                            ...params,
                            id: this.id
                        }
                        this.service.edit(this.id, paramsObj).subscribe(
                            result => {
                                this.isVisibleadd = false;
                                tipMessage('保存成功！', 'success');
                                this.loadData();
                                this.id = undefined;
                                this.addsubmitloading = false;
                            },
                            error => {
                                this.id = undefined;
                                this.addsubmitloading = false;
                                return tipMessage(error, 'error');
                            }
                        )
                    } else {
                        this.addsubmitloading = false;
                        if (res.codeFlag) {
                            return tipMessage('费用code已存在！', 'error');
                        } else {
                            return tipMessage('费用名称已存在！', 'error');
                        }

                    }

                },
                err => {
                    this.id = undefined;
                    this.addsubmitloading = false;
                    return tipMessage(err, 'error');
                }
            )
        } else { //新增添加
            // 先进行名称是否已有的判断
            let paramsObjudge = {
                ...value,
            }
            this.service.judgenamerepeat(paramsObjudge).subscribe(
                res => {
                    if (!res.codeFlag && !res.nameFlag) {
                        let paramsObj = {
                            ...params,
                        }
                        this.service.add(paramsObj).subscribe(
                            result => {
                                this.isVisibleadd = false;
                                tipMessage('保存成功！', 'success');
                                this.loadData();
                                this.id = undefined;
                                this.addsubmitloading = false;
                            },
                            error => {
                                this.id = undefined;
                                this.addsubmitloading = false;
                                return tipMessage(error, 'error');
                            }
                        )
                    } else {
                        this.addsubmitloading = false;
                        if (res.codeFlag) {
                            return tipMessage('费用code已存在！', 'error');
                        } else {
                            return tipMessage('费用名称已存在！', 'error');
                        }

                    }

                },
                err => {
                    this.id = undefined;
                    this.addsubmitloading = false;
                    return tipMessage(err, 'error');;
                }
            )


        }


    }




}
