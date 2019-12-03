import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../entity/user-group';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-train-class-reglist',
    templateUrl: './train-class-reglist.component.html',
    styleUrls: ['./train-class-reglist.component.scss']
})
export class TrainClassReglistComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    searchBy: {
        username?: string,
        displayName?: any,
        userGroup?: UserGroup[]
    } = {};
    columns = [
        { title: 'ID', tpl: 'id' },
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '邮箱', tpl: 'email' },
        { title: '操作', tpl: 'actions' }
    ];
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private apiservice: TrainingClassApiService,
        private fb: FormBuilder
    ) { }
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            tbcId: this.trainId,

            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['displayName'] = this.searchBy.displayName;
        }
        this.apiservice.getreglist(params).subscribe(
            res => {
                // console.log(res);
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
    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [],
            displayName: [],
            userGroup: [],
            // attendanceScore: []
        })
        this.routeInfo.parent.params.subscribe(
            params => {
                this.trainId = params.tbcId
                console.log(this.trainId, 224)
            }
        )
        this.loadData();
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
    // 添加登录授权注册人
    // viewpersondetail($event) {
    //     this.route.navigate(['../', 'registrationadd'], { relativeTo: this.routeInfo })
    // }
    // 删除人员
    deleteuser(id) {
        // console.log(id, 112)
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '确定要删除此人员？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.apiservice.deletereguser(id).subscribe(
                    res => {
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
    }
    // 批量删除
    mutipleDelete(event) {
        if (this.selection.length) {
            let self = this;
            let ids = this.getuserId(this.selection)
            this.confirmServ.confirm({
                title: '删除',
                content: '确定要删除此人员？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.apiservice.deletereguser(ids).subscribe(
                        res => {
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
            return tipMessage('请选择要删除的项！');
        }
    }
    // 返回
    gobackto(event) {
        // console.log(event, 12)
        this.route.navigate(['../../', 'condition'], { relativeTo: this.routeInfo })
    }
    userLookupOk(event) {
        // console.log(event);
        if (event) {
            this.spinning = true;
            let ids = this.getuserId(event);
            let paramsobj = {
                trainingClass: {
                    id: this.trainId,
                },
                userIds: ids
            }
            this.apiservice.addregperson(paramsobj).subscribe(
                res => {
                    tipMessage('添加注册人成功！', 'success');
                    this.loadData();
                },
                err => {
                    this.spinning = false;
                    return tipMessage('添加失败');
                }
            )
        } else {
            return tipMessage('请选择用户！');
        }
    }
    // 获取人员的id
    getuserId(array?: any[]) {

        let ids = [];
        array.map((item, i) => {
            ids.push(item.id);
        })
        return ids;
    }
}
