import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
// import { setTimeout } from 'timers';

@Component({
    selector: 'spk-personlist',
    templateUrl: './personlist.component.html',
    styleUrls: ['./personlist.component.scss']
})
export class PersonlistComponent implements OnInit {
    _searchForm: FormGroup;
    _addForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    searchBy: any = {};
    matchUser: boolean = true;
    testListData: any;
    hourId: any;
    status: any;
    columns: any = [
        { title: '工号', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '手机号码', tpl: 'phoneNumber' },
        { title: '性别', tpl: 'sex' },
        { title: '所属组织', tpl: 'group' },
        { title: '状态', tpl: 'status' },
        { title: '操作', tpl: 'actions' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        // console.log(this.searchBy, 224)
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            activeId: this.hourId,
            ...this.searchBy
            // knowledgeId: this.selectTreeId
        };
        this.hourservice.getprioddeclaruserlist(params).subscribe(
            res => {
                console.log(res);
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
        private hourservice: HourService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [''],
            idcardNumber: [''],
        })
        this.routeInfo.params.subscribe(
            (params) => {
                this.hourId = params.id;
            }
        )
        this.routeInfo.queryParamMap.subscribe(
            (params) => {
                this.status = params.get('status');
            }
        )
        this.loadData()
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
    // 批量删除
    batchdelete($event) {
        let self = this;
        if (self.selection.length) {
            let params = this.getbatchselectionid(this.selection);
            self.confirmServ.confirm({
                title: '批量删除',
                content: '您确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletedeclaruser(params).subscribe(
                        (res) => {
                            tipMessage('删除成功！', 'success');
                            self.loadData();
                        },
                        err => {
                            tipMessage(err);
                        }
                    )
                    // return new Promise((resolve) => {
                    //     setTimeout(resolve, 1000);
                    // });
                },
                onCancel() {
                }
            })

        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    userLookupOk(selectd) {
        if (selectd) {
            let ids = this.getids(selectd);
            let params = {
                periodActiveInformation: {
                    id: this.hourId
                },
                userIds: ids
            }
            this.hourservice.adduserlist(params).subscribe(
                res => {
                    this.loadData();
                    tipMessage('添加人员成功！', 'success');
                },
                error => {
                    return tipMessage(error);
                }
            )

        } else {
            return tipMessage('你没有选择要操作的项！');
        }
    }

    // singledelete单个删除
    singledelete(id) {
        let self = this;
        let ids = [id];
        console.log(ids, 222)
        this.confirmServ.confirm({
            title: '删除',
            content: '您确定要删除此项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletedeclaruser(ids).subscribe(
                    (res) => {
                        tipMessage('删除成功！', 'success');
                        self.loadData();
                    },
                    err => {
                        tipMessage(err);
                    }
                )
                // return new Promise((resolve) => {
                //     setTimeout(resolve, 1000);
                // });
            },
            onCancel() {

            }
        })
    }
    // 将选择的selection中的id放在数组中
    getbatchselectionid(array: any[]) {
        // console.log(array, 222)
        let batcharray = [];
        array.map((item, i, arrays) => {

            batcharray.push(item.id)
        })
        return batcharray;
    }

    getids(array: any[]) {
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
                return value
            }
        } else {
            return '--'
        }
    }
}
