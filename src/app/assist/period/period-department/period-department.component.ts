import { Component, OnInit } from '@angular/core';
import { PeriodApiService } from 'app/assist/period/period-api.service';
import { Pagination } from 'app/core/entity/pagination';
import { error } from 'util';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'spk-period-department',
    templateUrl: './period-department.component.html',
    styleUrls: ['./period-department.component.scss']
})
export class PeriodDepartmentComponent implements OnInit {
    _form: FormGroup;
    spinning: boolean = false;
    testListData: any;
    selection: any[] = [];
    search;
    editspinning: boolean = false;
    isVisible: boolean = false;
    editperiodId: any;
    files: any = []; // 上传文件流
    resfiles: any = []; // 编辑返回
    remarkArray: any = []; // 标记删除上传文件数组
    btnstate: boolean = false;
    columns: any = [

        { title: '培训主题', data: 'name' },
        { title: '申报人', tpl: 'displayName' },
        { title: '学时明细条数', data: 'hasCount', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            search: this.search
        }
        this.apiService.departmentList(params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                // this.judgeCheckable();
            },
            error => {
                tipMessage(error);
            }
        )
    }
    constructor(
        private apiService: PeriodApiService,
        private confrim: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.loadData();
    }
    // 删除
    mutipleDelete() {
        if (this.selection && this.selection.length) {
            if (this.judgeHasDelete(this.selection)) {
                return tipMessage('所选项包含学时明细不可删除');
            }
            this.confrim.confirm({
                title: '删除',
                content: '确定要删除所选内容?',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    let ids = this.getIds(this.selection);
                    this.apiService.departmentDelete(ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage(err);
                        }
                    )
                }
            })
        } else {
            tipMessage('请选择要删除的项')
        }
    }
    // 单个删除
    singleDelete(ids) {
        this.confrim.confirm({
            title: '删除',
            content: '确定要删除此项?',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.apiService.departmentDelete(ids).subscribe(
                    res => {
                        tipMessage('删除成功！', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(err);
                    }
                )
            }
        })
    }
    // 保存
    _saveformmessage(event, value) {
        let params = {
            ...value,
            attachs: this.files,
        }
        this.btnstate = true;
        if (this.editperiodId) {
            this.apiService.departmentEdit(this.editperiodId, params).subscribe(
                res => {
                    this.resetForm();
                    tipMessage('编辑成功！', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err);
                    this.btnstate = false;
                }
            )
        } else {
            this.apiService.departmentAdd(params).subscribe(
                res => {
                    this.resetForm();
                    tipMessage('添加成功！', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err);
                    this.btnstate = false;
                }
            )
        }
    }
    handleCancel(event) {
        this.resetForm();
    }
    resetForm() {
        this.isVisible = false;
        this.resfiles = [];
        this.remarkArray = [];
        this.files = [];
        this.btnstate = false;
        this.editperiodId = undefined;
    }
    goBack() {
        this.resetForm();
    }
    // 添加部门学时addDepartmentHour
    addDepartmentHour() {
        this.isVisible = true;
        this._form = this.fb.group({
            name: ['', [Validators.required]],
        })
    }
    editDepartment(id) {
        this.editperiodId = id;
        this.isVisible = true;
        this.editspinning = true;
        this._form = this.fb.group({
            name: ['', [Validators.required]],
        })
        this.apiService.departmentGetDetail(id).subscribe(
            res => {
                this._form = this.fb.group({
                    name: [res.name, [Validators.required]],
                })
                this.files = res.attachs;
                this.editspinning = false;
            },
            err => {
                tipMessage(err);
                this.editspinning = false;
            }
        )
    }
    // 上传文件
    onFileUpload(result) {
        this.files = this.resfiles.concat(result);
        this.files = this.judgeremovefile(this.remarkArray, this.files)

    }
    // 删除文件
    removeUploadfile(onlyFile) {
        this.remarkArray.push(onlyFile);
        this.files = this.getDataOnly(onlyFile, this.files);

    }
    // 过滤唯一对应的数据
    getDataOnly(onlyTip, array: any[]) {
        let onlyFile = [];
        return array.filter((item, index) => {
            return item.relativePath !== onlyTip
        })
    }
    // 判断去除已删除的文件流
    judgeremovefile(removearray: any[], array: any[]) {
        return array.filter((item, index) => {
            return removearray.indexOf(item.relativePath) == -1;
        })
    }
    // 获取ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 判断是否可以删除
    judgeCheckable() {
        this.testListData.content.map((item) => {
            if (item.hasCount) {
                item.checkable = false;
            }
        })
    }
    judgeHasDelete(arrary: any[]) {
        return arrary.some((item) => {
            return item.hasCount
        })
    }
}
