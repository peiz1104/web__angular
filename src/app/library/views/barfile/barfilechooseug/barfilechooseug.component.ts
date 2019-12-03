import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Pagination } from 'app/core/entity/pagination';
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmploymentDocumentsService } from '../../../service/employment-documents.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-barfilechooseug',
    templateUrl: './barfilechooseug.component.html',
    styleUrls: ['./barfilechooseug.component.scss']
})
export class BarfilechooseugComponent implements OnInit {
    stripeFileId: any;
    testListData: any;
    selection: any[] = [];
    spinning: boolean = false;
    columns: any = [
      //  { title: 'ID', data: 'id' },
        { title: '文件名', tpl: 'fileName' },
        { title: '分公司名称', tpl: 'declaredisPlayName', styleClass: 'text-left' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center time-width' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center time-width' },
        { title: '是否共享', tpl: 'myself', styleClass: 'text-center' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // knowledgeId: this.selectTreeId
        };
        this.service.shareList(this.stripeFileId, params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: EmploymentDocumentsService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.routeInfo.params.subscribe(
            params => {
                this.stripeFileId = params.barfileId
            }
        )
        this.loadData();
    }
    // 返回
    goPerBack() {
        window.history.back();
    }
    // 取消共享
    cancelShare() {
        if (this.selection && this.selection.length) {
            let ids = this.selection.map(item => item.id);
            this.modal.confirm({
                title: '取消共享',
                content: '确定要取消共享所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.shareRemove(ids).subscribe(
                        res => {
                            tipMessage('取消共享成功！','success');
                            this.loadData();
                        },
                        error => {
                            tipMessage(error);
                        }
                    )
                }
            })
        } else {
            return tipMessage('请选择要共享的项！');
        }
    }
    // 选择共享
    userGroupLookupOk(value) {
        if (value.length) {
            let userGroupIds = value.map(it => it.id);
            this.service.chooseShare(this.stripeFileId, userGroupIds).subscribe(
                res => {
                    tipMessage('共享成功!', 'success');
                    this.loadData();
                },
                error => {
                    tipMessage(error);
                }
            )
        } else {
            return tipMessage('请选择共享组织');
        }
    }
}
