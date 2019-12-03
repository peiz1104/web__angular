import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../../service/research.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-researchfeemanage',
    templateUrl: './researchfeemanage.component.html',
    styleUrls: ['./researchfeemanage.component.scss']
})
export class ResearchfeemanageComponent implements OnInit {
    @Input() id: any;
    @Input() phaseId: any;
    devStatus: any;
    _searchForm: FormGroup;
    validateForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    pulltestListData: any;
    isVisible: boolean = false; // 添加费用的modal框
    options: any; // 基本费用类型
    editspinning: boolean = false; // 编辑基本费用的loading
    editId: any; // 编辑费用时的对应的id
    feedetailData: any;
    submitloading: boolean = false;
    searchBy: {
        trainFeeType?: string,
    } = {};
    columns = [
        { title: '费用金额（元）', tpl: 'price' },
        { title: '费用类型', tpl: 'branches' },
        { title: '描述信息', tpl: 'description' },
        { title: '创建时间', tpl: 'createDate', styleClass: 'text-center' },
        { title: '创建人', tpl: 'createBy', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    // 添加编辑基本费用数据
    costInitFormData = {
        trainFeeType: ['', [Validators.required]],
        fee: ['', [Validators.required, Validators.pattern(/^[0-9]+([.]{1}[0-9]*){0,1}$/)]],
        description: []
    };
    // 加载基本费用列表
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'developmentPhase': this.phaseId,
            objectType: 'D'
        };
        if (this.searchBy.trainFeeType) {
            params['trainFeeType.name'] = this.searchBy.trainFeeType;
        }
        this.service.endclassmanagebaselist(params).subscribe(
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
        private service: ResearchService,
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            trainFeeType: []
        })
        this.routeInfo.paramMap.subscribe(
            params => {
                this.phaseId = params.get('stepId');
                this.id = params.get('id');
            }
        )
        this.routeInfo.queryParams.subscribe(
            params => {
                this.devStatus = params.status;
            }
        )
        this.service.getfeebasemesage(this.phaseId).subscribe(
            res => {
                // console.log(res);
                if (Object.prototype.toString.call(res) == '[object Object]') {
                    this.feedetailData = 0;
                } else {
                    this.feedetailData = res;
                }
            },
            err => {
                return tipMessage(err);
            }
        )
        this.service.getcostType({ objectType: 'D' }).subscribe(
            (res) => {
                this.options = res;
                this.loadData();
            },
            err => {
                tipMessage(err);
                this.loadData();
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
    // 添加费用
    showmodal() {

        this.isVisible = true;
        this.validateForm = this.fb.group({
            trainFeeType: ['', [Validators.required]],
            fee: ['', [Validators.required, Validators.pattern(/^[0-9]+([.]{1}[0-9]*){0,1}$/)]],
            description: []
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
        this.validateForm = this.fb.group(this.costInitFormData);

        this.service.getlooksinglecost(id).subscribe(
            res => {
                this.editId = id;
                // console.log(res, 4444)
                this.editspinning = false;
                // tslint:disable-next-line:forin
                for (let key in this.costInitFormData) {
                    this.costInitFormData[key] = [res[key], this.costInitFormData[key][1]]
                    if (key == 'trainFeeType') {
                        this.costInitFormData['trainFeeType'] = [res['trainFeeType'].id, this.costInitFormData['trainFeeType'][1]];
                    }
                }
                this.validateForm = this.fb.group(this.costInitFormData)
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
            objectType: 'D',
            trainFeeType: { id: value.trainFeeType },
            developmentPhase: { id: this.phaseId }
        }
        if (this.editId) {
            paramsobj['id'] = this.editId;
            paramsobj['isDeleted'] = false;
        }
        this.submitloading = true;
        // 手工添加基本费用
        this.service.handeladdbasecost(paramsobj).subscribe(
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

    // 批量删除
    mutipledelete() {
        let self = this;
        if (this.selection.length) {
            let ids = this.getids(this.selection);
            // 判断选择的有没有从SAP中拉取的
            this.confirmServ.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.service.deletebasecost(ids).subscribe(
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
            return tipMessage('请选择要删除的项！');
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
}
