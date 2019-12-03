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
import * as moment from 'moment';

@Component({
    selector: 'spk-hourauditlist',
    templateUrl: './hourauditlist.component.html',
    styleUrls: ['./hourauditlist.component.scss']
})
export class HourauditlistComponent implements OnInit {
    columns: any = [
        /*{title: '员工编号', tpl: 'username', styleClass: 'text-center'},
        {title: '姓名', tpl: 'displayName', styleClass: 'text-center'},*/
        { title: '培训名称', data: 'trainName' },
        { title: '培训内容', tpl: 'trainContent', styleClass: 'over-flow-text' },
        { title: '培训主题', tpl: 'periodTrainingTheme' },
        { title: '培训类型', tpl: 'periodTrainingType' },
        { title: '培训方式', tpl: 'periodTrainingWey' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '培训天数', data: 'trainDays', styleClass: 'text-right' },
        { title: '学时数', data: 'periodNumber', styleClass: 'text-right' },

        // { title: '审核状态', data: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    trainWeyData: any[] = []; // 培训方式
    trainthemeData: any[] = []; // 培训主题
    traintypeRootData: any; // 培训类型根节点数据
    traintypeAllData: any[] = []; // 培训类型所有数据
    searchBy: {
        trainName?: string,
        userGroup?: UserGroup[],
        periodTrainingTheme?: any,
        trainType?: any,
        trainWey?: any,
        startDate?: any,
        endDate?: any
    } = {};
    testListData: any;

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
        params['trainName'] = this.searchBy.trainName;
        if (this.searchBy.trainWey) {
            params['periodTrainingWey.id'] = this.searchBy.trainWey;
        }
        console.log('11', this.searchBy)
        if (this.searchBy.trainType) {
            params['periodTrainingType.id'] = this.searchBy.trainType[this.searchBy.trainType.length - 1];
        }
        if (this.searchBy.periodTrainingTheme) {
            params['periodTrainingTheme.id'] = this.searchBy.periodTrainingTheme;
        }
        if (this.searchBy.startDate) {
            params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.endDate) {
            params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD');
        }
        // console.log(params, 333)
        this.hourservice.getauditinglist(params).subscribe(
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

    constructor(private message: NzMessageService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private hourservice: HourService,
        private fb: FormBuilder,
        private confirmServ: NzModalService) {
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            trainName: [],
            periodTrainingTheme: [],
            trainType: [],
            trainWey: [],
            startDate: [null],
            endDate: [null]
        })

        // this.hourservice.getCurrentUser().subscribe(
        //     user => {
        //         this.searchBy.userGroup = [user.managerGroup];
        //         // this.spinning = false;
        //     }
        // )
        this.loadData();
        // 获取培训级别
        this.hourservice.gettraintypeall().subscribe(
            res => {
                this.traintypeAllData = res.array;
                let rootdata = this.getTraintypeData(res.array);
                this.traintypeRootData = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // 培训方式
        this.hourservice.gettrainweyall().subscribe(
            res => {
                // console.log(res, '培训方式')
                // tslint:disable-next-line:whitespace
                this.trainWeyData = res
            },
            err => {
                return tipMessage(err);
            }
        )
        // peixun主题
        this.hourservice.gettraintheme().subscribe(
            res => {
                this.trainthemeData = res;
            }
        )
    }

    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value)
        this.searchBy = value;
        console.log(this.searchBy);
        this.loadData();
        return;
    }

    // 审核学时
    toexamine(id) {
        this.route.navigate([`/classhour/houraduitmanage/${id}/aduitpassrefuse`])
    }

    // 批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            let self = this;
            let ids = this.getids(this.selection);
            this.confirmServ.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletedeclarhour(ids).subscribe(
                        res => {
                            self.loadData();
                            tipMessage('删除成功', 'success');
                        },
                        error => {
                            return tipMessage(error);
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

    // 单个删除
    deletesignle(event, ids) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '确定要删除此项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletedeclarhour(ids).subscribe(
                    res => {
                        tipMessage('删除成功', 'success');
                        self.loadData();
                    },
                    error => {
                        return tipMessage(error);
                    }
                )
            }
        })
    }

    // 获取选中项 的ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
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
    // 获取培训类型的rootdata
    getTraintypeData(array: any[]) {
        return array.filter((item, index) => {
            return item.parent == null
        })
    }
    // 对数据进行遍历转化为三级联动所需的形式
    transTraintypeData(array: any[]) {
        let transData = [];
        if (array.length) {
            array.map((item, index) => {
                transData.push({
                    value: item.id,
                    label: item.name,
                    isLeaf: item.childrenCount == 0
                })
            })
        }

        return transData;
    }
    // 去寻找某个节点对应的所有子集
    findchildrenData(id) {
        return this.traintypeAllData.filter((item, index) => {
            if (item.parent) {
                return item.parent.id == id;
            }
        })
    }
    _console(value) {
        // console.log(value, '培训类型的三级联动');
    }
    // 加载培训类型
    loadTrainTypeData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.traintypeRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }

    }
}
