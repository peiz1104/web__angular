import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core/entity/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchService } from "app/development/research/service/research.service";
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-steplist',
    templateUrl: './steplist.component.html',
    styleUrls: ['./steplist.component.scss']
})
export class SteplistComponent implements OnInit {
    spinning: boolean = true;
    testListData: any;
    selection: any[] = [];
    devStatus: any;
    devId: any;
    name: any = '';
    loginUserMessage: any = {};
    columns: any = [
        { title: '阶段名称', data: 'name', styleClass: 'text-left' },
        { title: '阶段序号', tpl: 'phaseNo', styleClass: 'text-left' },
        { title: '负责人', tpl: 'user', styleClass: 'text-center' },
        { title: '创建人', data: 'createdByDisplayName', styleClass: 'text-left' },
        { title: '费用预算', data: 'trainingBudget', styleClass: 'text-right' },
        { title: '里程进度', tpl: 'status', styleClass: 'text-center' },
        { title: '编辑', tpl: 'edit', styleClass: 'text-center' },
        { title: '实施', tpl: 'implementation', styleClass: 'text-center' },
        { title: '通知', tpl: 'notice', styleClass: 'text-center' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            name: this.name ? this.name.replace(/^\s*|\s$/g, '') : '',
            // knowledgeId: this.selectTreeId
        };
        this.service.getsteplist(this.devId, params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
                // console.log(res, 44)
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
        private service: ResearchService,
        private fb: FormBuilder,
        private confirmsev: NzModalService
    ) { }
    ngOnInit() {
        this.routeInfo.params.subscribe(
            res => {
                this.devId = res.id;
            }
        )
        this.routeInfo.queryParams.subscribe(
            res => {
                this.devStatus = res.devStatus;
            }
        )
        // 获取登录人信息
        this.service.getloginusermessage(this.devId, { id: this.devId }).subscribe(
            res => {
                // console.log(res, 'denglu')
                this.loginUserMessage = res;
                this.loadData();
            },
            error => {
                this.spinning = false;
                return tipMessage('获取登录人信息失败！');
            }
        )
    }
    // 批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            // 已结项不能删除不能删除他人的阶段
            let m = this.judgeSelf(this.selection);
            if (m) {
                return tipMessage('不能删除其他人员进度！');
            }
            let ids = this.getIds(this.selection);
            this.confirmsev.confirm({
                title: '删除',
                content: '确定要删除？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.deletePashList(this.devId, ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
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
    // 删除判断是否结项是否为本人
    judgeSelf(array: any[]) {
        return array.some((item, index) => {
            return item.createdById != this.loginUserMessage.userTokenId && item.user.id != this.loginUserMessage.userTokenId;
        })
    }
    // 获取ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 搜索
    searchData() {
        this.loadData();
    }
    // 新增项目阶段
    addstep(value) {
        this.route.navigate([`/development/research/${this.devId}/steplist/addstage`])
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 编辑
    devedit(value) {
        this.route.navigate([`/development/research/${this.devId}/steplist/${value.id}/editstage`])
    }
    // 查看历史
    history(value) {
        // tslint:disable-next-line:max-line-length
        this.route.navigate([`/development/research/${this.devId}/steplist/${value.id}/stepdetail`], { queryParams: { status: this.devStatus } })
    }
    // 进入通知
    goNotice(value) {
        // 判断是不是本人判断是不是已经结束
        let isSelf = value.createdById == this.loginUserMessage.userTokenId || value.user.id == this.loginUserMessage.userTokenId;
        // tslint:disable-next-line:max-line-length
        this.route.navigate([`/development/research/${this.devId}/steplist/${value.id}/noticelist/${value.messageBoxId}`], { queryParams: { status: this.devStatus, isSelf: isSelf } })
    }

}
