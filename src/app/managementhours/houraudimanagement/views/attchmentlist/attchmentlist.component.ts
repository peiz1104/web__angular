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
import { tipMessage } from 'app/account/entity/message-tip';
// import { setTimeout } from 'timers';

@Component({
    selector: 'spk-attchmentlist',
    templateUrl: './attchmentlist.component.html',
    styleUrls: ['./attchmentlist.component.scss']
})
export class AttchmentlistComponent implements OnInit {
    spinning: boolean = true;
    isVisibleFileAdd: boolean = false;
    okstateloading: boolean = false;
    selection: any[] = [];
    searchBy: {} = {};
    _searchForm: FormGroup;
    _addForm: FormGroup;
    testListData: any;
    hourId: any;
    columns: any = [
        { title: '附件名', data: 'filename' },
        { title: '附件大小', data: 'filesize' },
        { title: '附件上传日期', data: 'uploadDate' },
        { title: '操作', tpl: 'actions' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            activeId: this.hourId,
            ...this.searchBy
            // knowledgeId: this.selectTreeId
        };
        this.hourservice.getprioddeclarfilelist(params).subscribe(
            res => {
                console.log(res)
                this.spinning = false;
                this.testListData = res;
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
        private confirmServ: NzModalService,
        private hourservice: HourService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            filename: ['']
        })
        this.routeInfo.params.subscribe(
            (params) => {
                this.hourId = params.id;
            }
        )
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 批量删除附件
    batchdelete(event) {
        let self = this;
        if (this.selection.length) {
            let params = this.getbatchselectionid(this.selection);
            this.confirmServ.confirm({
                title: '批量删除',
                content: '您确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletedeclarfile(params).subscribe(
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
            })
        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    // 已选择的文件
    selectFile(value) {
        console.log(value, 222)
    }
    // 批量增加附件
    batchadd(event) {
        this.isVisibleFileAdd = true;
        this._addForm = this.fb.group({
            userGroup: []
        })
    }
    // 添加附件的确定
    handleOk(event) {
        this.okstateloading = true;
        setTimeout(() => {
            this.isVisibleFileAdd = false;
            this.okstateloading = false;
        }, 1000)
    }
    singledelete(id) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '您确定要删除此项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletedeclarfile([id]).subscribe(
                    (res) => {
                        tipMessage('删除成功！', 'success');
                        this.loadData();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() {
            }
        })
    }
    // 获取selection数组中的id方法
    getbatchselectionid(array: any[]) {
        // console.log(array, 222)
        let batcharray = [];
        array.map((item, i, arrays) => {

            batcharray.push(item.id)
        })
        return batcharray;
    }
}
