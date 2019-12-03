import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
import { BlockScrollStrategy } from 'ng-zorro-antd/src/core/overlay/scroll/block-scroll-strategy';
import { error } from 'util';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-basecost',
    templateUrl: './basecost.component.html',
    styleUrls: ['./basecost.component.scss']
})
export class BasecostComponent implements OnInit {
    @Output() remove: EventEmitter<any> = new EventEmitter();
    _searchForm: FormGroup;
    validateForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    pulltestListData: any;
    trainId: any;
    isVisible: boolean = false; // 添加费用的modal框
    isVisiblePull: boolean = false; // 拉取费用的modal框的状态
    inputValue: any;
    showTip: boolean = false;
    submitloading: boolean = false;
    pullcostloading: boolean = false; // 拉取费用时的loading
    pullspinning: boolean = false;
    addPullState: boolean = false; // 添加拉取费用的列表
    options: any; // 基本费用类型
    editspinning: boolean = false; // 编辑基本费用的loading
    editId: any; // 编辑费用时的对应的id
    trainBaseFeeStatus: any; // 如果哦为false则编辑可以用未审核否则审核通过
    feeCounts: number = 0;
    searchBy: {
        trainFeeType?: string,
    } = {};
    columns = [
        { title: '费用金额（元）', tpl: 'price' },
        { title: '费用类型', tpl: 'branches' },
        { title: '描述信息', tpl: 'description', styleClass: 'width-fix' },
        { title: '是否从SAP拉取', tpl: 'isFromSAP', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    // 加载基本费用列表
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'offering.id': this.trainId,
        };
        if (this.searchBy.trainFeeType) {
            params['trainFeeType.name'] = this.searchBy.trainFeeType;
        }
        this.costservice.endclassmanagebaselist(params).subscribe(
            res => {
                // console.log(res);

                this.spinning = false;
                this.testListData = res;
                this.selection = [];
                if (this.testListData.content.length) {
                    this.getallCount();
                }
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }
    // 加载拉取费用列表
    pullLoadData(sapNum, page?: Pagination<any>) {
        this.pullspinning = true;
        let params = {
            sapNum: sapNum
        };
        this.costservice.pullcostdatalist(params).subscribe(
            res => {
                // console.log(res);
                if (res.flag == -1) {
                    this.pullspinning = false;
                    this.pulltestListData = [];
                    this.pullcostloading = false;
                    return tipMessage('没有数据或费用编码不对');
                } else if (res.flag == 0) {
                    this.pullspinning = false;
                    this.pulltestListData = [];
                    this.pullcostloading = false;
                    return tipMessage('费用还未通过审批');
                } else {
                    this.pullspinning = false;
                    this.pulltestListData = this.addOfferId(res);
                    this.pullcostloading = false;
                }

            },
            err => {
                this.pullspinning = false;
                this.pullcostloading = false;
                return tipMessage(err);
            }
        )
    }
    // 请求数据列表加载list判断是否审核通过
    judgetrainBaseFeeStatus() {
        this.costservice.judgeapproval(this.trainId).subscribe(
            res => {
                this.remove.emit({ res });
                this.trainBaseFeeStatus = res.trainBaseFeeStatus == 'N' ? false : true;
                this.loadData()
            },
            erro => {
                return tipMessage(erro);
            }
        )
    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private costservice: TrainingClassApiService,
        private fb: FormBuilder,
        private http: Http
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            trainFeeType: []
        })

        this.costservice.getcostType().subscribe(
            (res) => {
                // console.log(res, 35)
                this.options = res;
            },
            err => {
                return tipMessage(err);
            }
        )
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId;
        })
        this.judgetrainBaseFeeStatus();

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
        let self = this;
        if (this.selection.length) {
            let ids = this.getids(this.selection);
            // 判断选择的有没有从SAP中拉取的
            let hasformsap = this.judgedataformSAP(this.selection);
            if (hasformsap) {
                return tipMessage('请取消从SAP拉取的数据！');
            } else {
                this.confirmServ.confirm({
                    title: '删除',
                    content: '确定要删除所选项？',
                    showConfirmLoading: true,
                    zIndex: 1003,
                    onOk() {
                        self.costservice.deletebasecost(ids).subscribe(
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
            }
        } else {
            return tipMessage('请选择要删除的项！');
        }

    }
    // 判断有无从SAP中拉取的数据
    judgedataformSAP(array: any[]) {
        return array.some((item, index) => {
            return item.isFromSAP == true;
        })
    }
    // 复核申请
    applicationreview() {
        // 复核申请不加限制
        /* if (this.testListData && this.testListData.content.length == 0) {
            return this.message.error('暂无内容可以复核申请！')
        } */
        let self = this;
        this.confirmServ.confirm({
            title: '申请',
            content: '确定要进行复核申请？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                let params = {
                    trainBaseFeeStatus: 'Y'
                }
                self.costservice.costapproval(self.trainId, params).subscribe(
                    res => {
                        // this.trainBaseFeeStatus = res.success == 'true';
                        self.judgetrainBaseFeeStatus();
                        tipMessage('复核申请成功！', 'success');
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() { }
        })
    }

    // 导出费用申请
    exportcost() {
        let self = this;
        if (this.testListData && this.testListData.content.length == 0) {
            return tipMessage('暂无可导出内容！');
        }
        this.confirmServ.confirm({
            title: '导出',
            content: this.selection.length ? '确定要所选项导出？' : '确定要导出全部？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                let paramsObj = {
                    tbcId: self.trainId,
                    ids: self.getdownloadIds(self.selection)
                }
                // console.log(paramsObj)
                self.costservice.exportfile(paramsObj).subscribe(
                    (res) => {
                        // console.log(res, '导出费用');
                        self.costservice.downloadcostfile();
                        tipMessage('导出成功！', 'success');

                    },
                    err => {
                        return tipMessage(err);
                    }
                )

            },
            onCancel() { }
        })
    }
    // 导出所选项的id
    getdownloadIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 添加费用
    showmodal() {

        this.isVisible = true;
        this.validateForm = this.fb.group({
            trainFeeType: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            description: ['', [Validators.maxLength(500)]]
        })
    }
    // 确定取消按钮
    handleCancel(event) {
        this.isVisible = false;
        this.editId = undefined;
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    handleOk(event) {
        this.isVisible = false;
    }
    // a编辑费用时显示编辑费用弹窗
    viewdetail(id) {
        this.isVisible = true;
        this.editspinning = true;
        this.validateForm = this.fb.group({
            trainFeeType: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            description: ['', [Validators.maxLength(500)]]
        });
        this.costservice.getlooksinglecost(id).subscribe(
            res => {
                this.editId = id;
                // console.log(res, 4444)
                this.editspinning = false;
                this.validateForm = this.fb.group({
                    trainFeeType: [res['trainFeeType'].id, [Validators.required]],
                    fee: [res.fee, [Validators.required, this.feeControl]],
                    description: [res.description, [Validators.maxLength(500)]]
                })
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
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        // console.log(value);
        let paramsobj = {
            ...value,
            isFromSAP: false,
            objectType: 0,
            trainFeeType: { id: value.trainFeeType },
            offering: { id: this.trainId }
        }
        if (this.editId) {
            paramsobj['id'] = this.editId;
            paramsobj['isDeleted'] = false;
        }
        this.submitloading = true;
        // 手工添加基本费用
        this.costservice.handeladdbasecost(paramsobj).subscribe(
            res => {
                tipMessage('添加成功！', 'success');
                this.submitloading = false;
                this.isVisible = false;
                this.editId = undefined;
                this.loadData()
            },
            err => {
                this.submitloading = false;
                return tipMessage(err);
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
    // 拉取费用
    pullcost() {
        this.isVisiblePull = true;
        // tslint:disable-next-line:curly
        if (!this.inputValue) return;
        let value = this.inputValue.replace(/^\s*|\s*$/g, '');
        this.pullLoadData(value);
    }
    // 框的显示影藏
    handleCancelPull(event) {
        this.isVisiblePull = false;
        this.inputValue = '';
    }
    handleOkPull(event) {
        if (this.pulltestListData && this.pulltestListData.length) {
            this.addPullState = true;

            this.costservice.addpullcost(this.pulltestListData).subscribe(
                res => {
                    tipMessage('拉取费用添加成功！', 'success');
                    this.isVisiblePull = false;
                    this.addPullState = false;
                    this.loadData();
                },
                err => {
                    this.isVisiblePull = false;
                    this.addPullState = false;
                    return tipMessage(err);
                }
            )
        } else {
            return tipMessage('没有数据可以添加!');
        }

    }
    // 输入费用编号
    _console(event) {
        let value = event.replace(/^\s*|\s*$/g, '')
        if (/^[0-9]*$/.test(value)) {
            this.showTip = false;
        } else {
            this.showTip = true;
        }
    }
    // 拉取数据
    pullcostdata() {
        if (this.inputValue) {
            if (this.showTip) {
                return tipMessage('输的费用编码有误，请检查后重新输入！', '', 4000);
            } else {
                this.pullcostloading = true;
                let value = this.inputValue.replace(/^\s*|\s*$/g, '');
                this.pullLoadData(value);
            }
        } else {
            return tipMessage('请输入费用编码！');
        }

    }
    // 将选择的数据分装为ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    // tiamnjia
    addOfferId(array: any[]) {
        let offerArray = [];
        array.map((item) => {
            offerArray.push({
                ...item,
                offering: { id: this.trainId }
            })
        })
        return offerArray;
    }
    // 获取总费用
    getallCount() {
        // tslint:disable-next-line:max-line-length
        (this.http.get(`/api/trainfee/total/${this.trainId}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
            this.feeCounts = data;
        })
    }
    // 金额限制
    feeControl = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control) {
                if (control.value) {
                    if (!/^[0-9]+([.]{1}[0-9]*){0,1}$/.test(control.value)) {
                        tipMessage('输入的金额格式错误！', '', 2000);
                        return { confirm: true, error: true };
                    }
                    if (control.value > 10000000) {
                        tipMessage('金额不能超过1000万', '', 2000)
                        return { confirm: true, error: true };
                    }
                }
            }
        }
    }
    // 撤销复核
    handelRevokeReview = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '撤销费用复核申请',
            content: '确定要撤销复核申请？撤销后将删除平均分摊费用和特殊学员分摊费用',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {

                self.costservice.revokeBaseFee(self.trainId).subscribe(
                    res => {
                        self.judgetrainBaseFeeStatus();
                        tipMessage('撤销复核申请成功！', 'success');
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
