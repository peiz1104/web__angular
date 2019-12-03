import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../../entity/user-group';
import { TrainingClassApiService } from './../../../../service/training-class-api.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-sharecost',
    templateUrl: './sharecost.component.html',
    styleUrls: ['./sharecost.component.scss']
})
export class SharecostComponent implements OnInit {
    _searchForm: FormGroup;
    validateForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    isVisible: boolean = false;
    submitloading: boolean = false;
    editspinning: boolean = false;
    selectedOption: any;
    editshareId: any;
    apportionFeeStatus: boolean; // 分摊费用
    isshareVisible: boolean = false; // 分摊费用modal列表
    shareSpinning: boolean = false;
    shareListData: any[] = []; // 分摊费用人员列表数据
    sharesubmitLoading: boolean = false;
    sharfee: any; // 分摊金额
    startsharefee: any;
    indexTable: number = 0;
    searchBy: {
        apportionType?: string,
        displayName?: string,
        userName?: string,
        userGroup?: UserGroup[]
    } = {};
    columns = [
        { title: '费用名称', tpl: 'apportionType' },
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        // { title: '组织信息', tpl: 'group' },
        // { title: '描述信息', tpl: 'description' },
        { title: '预算金额（元）', tpl: 'price' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'offering.id': this.trainId
        };
        if (this.searchBy.apportionType) {
            params['apportionType'] = this.searchBy.apportionType;
        }
        if (this.searchBy.userName) {
            params['username'] = this.searchBy.userName;
        }
        if (this.searchBy.displayName) {
            params['displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        this.costservice.sharecostlist(params).subscribe(
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
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private costservice: TrainingClassApiService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            displayName: [],
            username: [],
            apportionType: [''],
            userGroup: [null]
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId;
        })
        this.costservice.getbasesharestatus(this.trainId).subscribe(
            res => {
                // console.log(res, 'status');
                this.apportionFeeStatus = res.apportionFeeStatus == 'N' ? false : true;
                this.loadData()
            }
        )
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
    // 批量删除
    mutipledelete() {
        if (this.selection.length) {
            let self = this;
            let ids = this.getuserIds(this.selection);
            this.confirmServ.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.costservice.sharecostDelete(ids).subscribe(
                        res => {
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
            return tipMessage('请选择要删除的项');
        }

    }
    // 分摊费用如果费用没有审核通过则不能进行分摊费用
    sharecost() {
        this.isshareVisible = true;
        this.shareSpinning = true;
        this.costservice.getsharetotalfee(this.trainId).subscribe(
            total => {
                if (total.apportionTotalFee) {
                    this.startsharefee = total.trainBaseTotalFee - total.apportionTotalFee;
                } else {
                    this.startsharefee = total.trainBaseTotalFee;
                }

                this.costservice.getsharecostuser(this.trainId).subscribe(
                    res => {

                        this.shareSpinning = false;
                        // console.log(res, '分享人员列表')
                        this.shareListData = res;
                        let usersharefee = this.getuserallFee(this.shareListData);
                        this.sharfee = this.startsharefee - usersharefee

                    },
                    err => {
                        this.shareSpinning = false;
                        return tipMessage(err);
                    }
                )
            },
            error => {
                return tipMessage(error);
            }
        )


    }
    // 分摊费用modal列表显影
    handleCancelShareModal(event) {
        this.isshareVisible = false;
        this.sharfee = undefined; // 分摊金额
        this.startsharefee = undefined;
    }
    handleOkShareModal(event) {
        if (this.sharfee > 0) {
            return tipMessage('请将费用平均分配完成！');
        } else if (this.sharfee < 0) {
            return tipMessage('分配金额已超出范围！');
        } else if (this.sharfee == 0) {
            this.sharesubmitLoading = true;
            // 获取总的费用
            this.costservice.submitshareuserlist(this.trainId, this.shareListData).subscribe(
                res => {
                    // console.log(res, '分摊成功');
                    tipMessage('分摊费用成功！', 'success');
                    this.isshareVisible = false;
                    this.sharesubmitLoading = false;
                    this.sharfee = undefined; // 分摊金额
                    this.startsharefee = undefined;
                    this.costservice.getbasesharestatus(this.trainId).subscribe(
                        result => {
                            this.apportionFeeStatus = result.apportionFeeStatus == 'Y' ? true : false;
                            this.loadData()
                        }
                    )
                },
                err => {
                    this.sharesubmitLoading = false;
                    return tipMessage(err);
                }
            )
        }

    }
    // 获取所有人员分配的总金额
    getuserallFee(array: any[]) {
        let usertotal = 0;
        array.map((item, index) => {
            usertotal += item.fee;
        })
        return usertotal;
    }
    // 改变分配金额
    anginchangeInput(event, value, id) {
        let m = event.target.value.split('.')[1]
        // console.log(m, '截取数字');
        // console.log(event.target.value, value, id);
        // 每一次改变输入时调节shareListData对应的fee
        if (event.target.value < 0) {
            event.target.value = 0;
            return tipMessage('分配金额不能小于0');
        } else if (m && m.length > 2) {
            event.target.value = Math.round(event.target.value * 100) / 100;
        }
        this.shareListData.map((item, index) => {
            if (id == item.user.id) {
                // tslint:disable-next-line:radix
                this.shareListData[index].fee = Number(event.target.value);
            }
        })
        this.sharfee = this.startsharefee - this.getuserallFee(this.shareListData)

    }
    // 将分配人员数据转化为json

    conversionuserJson() {
        let paramsObj = {};
        this.shareListData.map((item, index) => {
            paramsObj[item.user.id] = item
        })
        return paramsObj;
    }
    // 切换你table
    changetable(event) {
        // console.log(event);
        this.indexTable = event.index;
    }
    // 添加费用
    showmodal() {
        this.isVisible = true;
        this.validateForm = this.fb.group({
            apportionType: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            description: ['', [Validators.maxLength(500)]],
            userIds: [[], [Validators.required]]
        })
    }
    // modal框的显示关闭
    handleCancel(event) {
        this.isVisible = false;
        this.selectedOption = undefined;
        this.editshareId = undefined;
    }
    handleOk(event) {
        this.isVisible = false;
        this.editshareId = undefined;
    }
    // 删除人员
    remove(value) {
        // console.log(value, 2344);
        if (value.v.length) {
            let m = value.v.filter((item, index) => {
                return item.id !== value.u.id;
            })
            // console.log(m)
            this.validateForm.get("userIds").setValue(m)
        }
    }
    // 编辑分摊费用
    viewdetail(id) {
        this.isVisible = true;
        this.editspinning = true;
        this.validateForm = this.fb.group({
            apportionType: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            description: ['', [Validators.maxLength(500)]],
            userIds: [[], [Validators.required]]
        });
        this.editshareId = id;

        this.costservice.getsinglesharecost(id).subscribe(
            res => {
                // console.log(res, 4443)
                if (res.apportionType == 'U') {
                    this.selectedOption = 'U'
                }
                if (res.apportionType == 'U' && !res.userIds) {
                    this.validateForm.get('userIds').setValue([]);
                }
                // tslint:disable-next-line:forin
                this.validateForm = this.fb.group({
                    apportionType: [res.apportionType, [Validators.required]],
                    fee: [res.fee, [Validators.required, this.feeControl]],
                    description: [res.description, [Validators.maxLength(500)]],
                    userIds: [[res['user']], [Validators.required]]
                });
                this.editspinning = false;
            },
            err => {
                this.editspinning = false;
                return tipMessage(err);
            }
        )

    }
    // 添加提交
    submitForm = ($event, value) => {
        $event.preventDefault();
        // console.log(value, 222)
        // 分摊费用判断表单提交的状况
        if (this.selectedOption == 'U' && value.userIds && !value.userIds[0]) {
            return tipMessage('请选择人员');
        }
        if (this.selectedOption == 'U') {
            if (this.validateForm.invalid) {
                return tipMessage('按要求填写完表单');
            }
        } else {
            this.validateForm.removeControl('userIds')
            if (this.validateForm.invalid) {
                return tipMessage('按要求填写完表单');
            }
        }
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        // console.log(value);
        this.submitloading = true;
        let paramsObj = {
            ...value,
            offering: {
                id: this.trainId
            }
        }
        if (this.editshareId) {
            paramsObj['id'] = this.editshareId;
            paramsObj['isDeleted'] = false;
        }
        if (this.selectedOption !== 'U') {
            delete paramsObj.userIds;
        } else {
            let ids = this.getuserIds(paramsObj.userIds).join(',');
            paramsObj['userIds'] = ids;
        }
        this.costservice.sharecostAdd(paramsObj).subscribe(
            res => {
                tipMessage('添加成功!', 'success');
                this.submitloading = false;
                this.isVisible = false;
                this.editshareId = undefined;
                this.selectedOption = undefined;
                this.loadData()
            },
            error => {
                tipMessage(error);
                this.submitloading = false;
            }
        )
    };
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    // 获取人员ids
    getuserIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            if (item) {
                ids.push(item.id)
            }
        })
        return ids;
    }
    // 分摊费用控制
    // 金额限制
    feeControl = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control && control.value) {
                if (!/^[0-9]+([.]{1}[0-9]*){0,1}$/.test(control.value)) {
                    tipMessage('输入的金额格式错误！', '', 3000);
                    return { confirm: true, error: true };
                }
                if (control.value > 10000000) {
                    tipMessage('金额不能超过1000万', '', 2000)
                    return { confirm: true, error: true };
                }
            }
        }
    }
    // 撤销分摊费用
    handelRevokeReview = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '撤销分摊费用',
            content: '确定要撤销分摊费用？撤销后将删除平均分摊费用和特殊学员分摊费用',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {

                self.costservice.revokeApportionFee(self.trainId).subscribe(
                    res => {
                        // tipMessage('撤销分摊费用成功！', 'success');
                        self.costservice.getbasesharestatus(self.trainId).subscribe(
                            result => {
                                tipMessage('撤销分摊费用成功！', 'success');
                                console.log(result, 444)
                                self.apportionFeeStatus = result.apportionFeeStatus == 'Y' ? true : false;
                                self.loadData()
                            }
                        )
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() { }
        })
    }
}
