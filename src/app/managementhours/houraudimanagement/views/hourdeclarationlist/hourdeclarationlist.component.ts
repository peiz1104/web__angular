import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { HourService } from '../../../managementservice/hour.service';
import { UserGroup } from './../../../entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { delay } from 'q';

@Component({
    selector: 'spk-hourdeclarationlist',
    templateUrl: './hourdeclarationlist.component.html',
    styleUrls: ['./hourdeclarationlist.component.scss']
})
export class HourdeclarationlistComponent implements OnInit {
    columns: any = [
        { title: '培训名称', tpl: 'trainName' },
        { title: '培训内容', tpl: 'trainContent', styleClass: 'over-flow-text' },
        { title: '培训主题', tpl: 'periodTrainingTheme' },
        { title: '培训类型', tpl: 'periodTrainingType' },
        { title: '培训方式', tpl: 'periodTrainingWey' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '培训学时', data: 'periodNumber', styleClass: 'text-right' },
        { title: '培训天数', data: 'trainDays', styleClass: 'text-right' },
        { title: '状态', tpl: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    judgeImportantAdd: boolean = true;
    searchBy: {
        trainName?: string,
        displayName?: string,
        userGroup?: UserGroup[]
    } = {};
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        if (this.searchBy.trainName) {
            params['trainName'] = this.searchBy.trainName
        }
        this.hourservice.getviewdeclarehourlist(params).subscribe(
            res => {
                // console.log(res, 444)
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private fb: FormBuilder,
        private hourservice: HourService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            trainName: [],
            userGroup: [null]
        })
        this.hourservice.judgeImportantAdd().subscribe(
            res => {
                this.judgeImportantAdd = res.isOpen;
            },
            err => {
                tipMessage(err);
            }
        )
        this.loadData();
        this.searchBy.trainName = '';
        // this.hourservice.getCurrentUser().subscribe(
        //     user => {
        //         // console.log(user, 3444)
        //         this.searchBy.userGroup = [user.managerGroup];

        //     }
        // )
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 删除
    delete(event) {
        // console.log(this.selection, 22)
        if (this.selection.length) {
            let self = this;
            let params = this.getselectionid(this.selection);
            this.confirmServ.confirm({
                title: '批量删除',
                content: '您确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletedeclarhour(params).subscribe(
                        (res) => {
                            tipMessage('删除成功！', 'success');
                            self.loadData();
                        },
                        err => {
                            return tipMessage(err);
                        }
                    )
                },
                onCancel() { }
            })

        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    // 批量导入
    batchimport(event) {
        this.route.navigate(['/classhour/houraduitmanage/hourdeclarationimport'])
    }
    // 添加培训学时addfrom
    addtrainhour(event) {
        this.route.navigate(['/classhour/houraduitmanage/declarationedit'])
    }
    // 导出学时
    exporthour(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            let params = {
                ...this.searchBy,
                ids: ids
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDeclarationHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,

                                fileName: '学时申报'
                            }
                            tipMessage('导出成功！', 'success');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            let ids = this.getIds(this.selection);
            let params = {
                ...this.searchBy,
                ids: ids
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出全部？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDeclarationHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '学时申报'
                            }
                            tipMessage('导出成功！', 'success');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })
        }

    }
    // 修改学员学时审核信息
    todeclartionedit(id) {
        this.route.navigate(['/classhour/houraduitmanage/declarationedit'], { queryParams: { id: id } })
    }
    // 查看人员列表
    viewpersonlist(row) {
        this.route.navigate([`/classhour/houraduitmanage/${row.id}/personlist`], { queryParams: { status: row.status } })
    }
    // 查看附件列表
    // viewattachmentlist(id) {
    //     this.route.navigate([`/classhour/houraduitmanage/${id}/attachmentlist`])
    // }
    // 批量删除获取selection中的id
    getselectionid(array: any[]) {
        let selectionarray = [];
        array.map((item, index, arrays) => {
            selectionarray.push(item.id);
        })
        return selectionarray;
    }
    // 学时审核的提交
    periodsubmit() {
        //  判断有无已提交的如果有已提交的则gei以提示
        if (this.selection.length) {
            let p = this.judgeSubmit(this.selection);
            if (p) {
                return tipMessage('请取消已提交的项！');
            } else {
                let ids = this.getIds(this.selection);

                this.confirmServ.confirm({
                    title: '提交',
                    content: '确定提交所选学时',
                    showConfirmLoading: true,
                    zIndex: 1003,
                    onOk: () => {
                        this.hourservice.periodDeclaresubmit({ ids: ids }).subscribe(
                            res => {
                                tipMessage('提交成功！', 'success');
                                this.loadData();
                            },
                            err => {
                                tipMessage(err);
                            }
                        )
                    },
                    onCancel() { }
                })
            }
        } else {
            return tipMessage('请选择要提交的项！');
        }
    }
    judgeSubmit(array: any[]) {
        return array.some((item, index) => {
            return item.status == 'P';
        })
    }
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    getUserGroup(value) {
        if (value) {
            if (value.indexOf(',') != -1) {
                return value.replace(/(\,|\，)/g, '/')
            } else {
                return value;
            }
        } else {
            return '--'
        }
    }

}
