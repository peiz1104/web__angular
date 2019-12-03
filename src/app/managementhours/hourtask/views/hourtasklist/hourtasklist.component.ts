import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { HourService } from '../../../managementservice/hour.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { query } from '@angular/animations/src/animation_metadata';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-hourtasklist',
    templateUrl: './hourtasklist.component.html',
    styleUrls: ['./hourtasklist.component.scss']
})
export class HourtasklistComponent implements OnInit {
    columns: any = [
        { title: '年度', data: 'year' },
        { title: '描述', tpl: 'remark', styleClass: 'text-left fix-width' },
        { title: '普通员工学时', data: 'staffPeriod', styleClass: 'text-right' },
        { title: '处级及以上员工学时', data: 'leaderPeriod', styleClass: 'text-right' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '查看', tpl: 'lookView', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    searchBy: any = {};
    testListData: any;
    nowDate: any = new Date().getFullYear();
    year: any;
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            ...this.searchBy,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // knowledgeId: this.selectTreeId
        };
        if (this.year) {
            params['year'] = this.year;
        }
        this.hourservice.gettasklist(params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.selection = [];
                this.testListData = res;
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private message: NzMessageService,
        private hourservice: HourService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            trainname: []
        });
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        console.log($event, value)
        return;
    }

    // 添加年度学时任务
    addhourtask(event, type) {
        this.route.navigate(['/classhour/hourtask/taskedit'], { queryParams: { type: type } })
    }
    // 编辑年度学时任务
    eidtpriod(id) {
        this.route.navigate([`/classhour/hourtask/taskedit`], { queryParams: { id: id } })
    }
    // 批量删除年度学时任务
    delete(event) {
        if (this.selection.length) {
            let self = this;
            this.confirmServ.confirm({
                title: '删除',
                content: '您是否确认要删除所选内容',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    let ids = self.getidmethod(self.selection);
                    // console.log(ids, 2221)
                    self.hourservice.deletepriodtask(ids).subscribe(
                        (res) => {
                            tipMessage('删除成功！', 'success');
                            self.loadData();
                        },
                        err => {
                            return tipMessage(err);
                        }
                    )
                },
                onCancel() {
                }
            });

        } else {
            return tipMessage('请选择要删除的内容！');
        }
    }
    // 单个的删除
    singledelete(id) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '是否确定删除此项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletepriodtask(id).subscribe(
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
    }
    // 删除年份
    removeyear() {
        this.year = '';
    }
    // 获取selection数组id的方法
    getidmethod(array) {
        let ids = [];
        for (let i = 0; i < array.length; i++) {
            ids.push(array[i]['id'])
        }
        return ids
    }
}
