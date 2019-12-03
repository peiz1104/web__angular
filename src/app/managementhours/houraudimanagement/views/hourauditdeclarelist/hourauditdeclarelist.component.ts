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
declare let $: any;
@Component({
    selector: 'spk-hourauditdeclarelist',
    templateUrl: './hourauditdeclarelist.component.html',
    styleUrls: ['./hourauditdeclarelist.component.scss']
})
export class HourauditdeclarelistComponent implements OnInit {

    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    trainWeyAllData: any[] = []; // 培训方式
    trainthemeAllData: any[] = []; // 培训主题
    traintypeRootData: any; // 培训类型根节点数据
    trainthemeRootData: any; // 培训主题所有根节点
    trainsourceRootData: any; // 培训来源所有根节点
    trainWeyRootData: any; // peixunfangshi
    traintypeAllData: any[] = []; // 培训类型所有数据
    judgeImportantAdd: boolean = true;
    searchBy: {
        trainName?: string,
        ownProjectGroup?: UserGroup[],
        periodTrainingTheme?: any,
        trainType?: any,
        trainWey?: any,
        startDate?: any,
        endDate?: any,
        isSubmit?: any,
        status?: any,
        declareUserName?: any,
        displayName?: any,
        username?: any,
        ownProject?: any
    } = {};
    testListData: any;
    isVisible: boolean = false;
    _form: FormGroup;
    btnstate: boolean = false;
    // _options: any = options; // 培训方式数据
    isFreeCost: boolean = false; // 判断是否收费
    trainFormDes: boolean = false; // 培训形式描述，当培训形式为其他时显示
    uploadfilename: any = undefined; // 上传文件的名字
    files: any = []; // 上传文件流编辑和添加都可以进行添加
    trainWeyAllDataUpdate: any[] = []; // 培训方式
    trainthemeAllDataUpdate: any[] = []; // 培训主题
    traintypeAllDataUpdate: any[] = []; // 培训类型所有数据
    trainsourceAllDataUpdate: any[] = [];
    traintypeRootDataUpdate: any; // 培训类型根节点数据
    trainthemeRootDataUpdate: any; // 培训主题所有根节点
    trainsourceRootDataUpdate: any; // 培训来源所有根节点
    trainWeyRootDataUpdate: any; // peixunfangshi

    resfiles: any = []; // 编辑现有的文件的数据
    remarkArray: any = [];
    _valueTrainType: any[] = null; // 培训类型
    spinningUpdate: boolean = false;
    textcontent: any;
    isVisibleRefuse: boolean = false;
    cpbtnstate: boolean = false;
    crbtnstate: boolean = false;
    departId: any;
    columns: any = [
        { title: '用户名', tpl: 'declareUserName', styleClass: 'text-left' },
        { title: '姓名', tpl: 'declaredisPlayName', styleClass: 'text-left' },
        { title: '所属组织', tpl: 'userGroupNamePath', styleClass: 'text-left group-width' },
        { title: '培训名称', tpl: 'trainName', styleClass: 'text-left train-name-width' },
        { title: '培训主题', tpl: 'periodTrainingTheme', styleClass: 'text-left' },
        { title: '培训内容', tpl: 'trainContent', styleClass: 'text-center train-content-width' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center time-width' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center time-width' },
        { title: '实际培训天数', tpl: 'trainDays', styleClass: 'text-left' },
        { title: '培训学时', tpl: 'periodNumber', styleClass: 'text-center' },
        { title: '审批人', tpl: 'approveUser', styleClass: 'text-left' },
        { title: '审批意见', tpl: 'approveInfo', styleClass: 'text-left approve-info-width' },
        { title: '是否提交', tpl: 'isSubmit', styleClass: 'text-center' },
        { title: '审核状态', tpl: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    columnsOther: any = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '培训名称', tpl: 'trainName', styleClass: 'text-left' },
        { title: '培训主题', tpl: 'periodTrainingTheme', styleClass: 'text-left' },
        { title: '培训内容', tpl: 'trainContent', styleClass: 'train-content-width' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '实际培训天数', tpl: 'trainDays', styleClass: 'text-right' },
        { title: '培训学时', tpl: 'periodNumber', styleClass: 'text-center' },
        { title: '审核状态', tpl: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    initFormData: any = {
        trainName: [''], // 培训名称
        trainPlace: [''], // 培训地点
        periodNumber: ['', [Validators.pattern(/^[0-9]*$/)]], // 培训学时
        trainPeople: ['', [Validators.pattern(/^[0-9]*$/)]], // 培训人数
        trainContent: [''], // 培训内容
        trainDays: ['', [Validators.pattern(/^[0-9]*$/)]], // 培训天数
        periodTrainingWey: [null], // 培训方式
        otherTypeDescription: [''], // 当培训形式为其他时显示培训形式描述
        trainForm: [undefined], // 培训形式
        periodTrainingTheme: [null], // 培训主题
        periodTrainingSource: [null], // 培训来源
        periodTrainingType: [null], // 培训类型
        userGroupName: [''], // 主办单位
        remark: [''], // 描述
        startDate: [null],
        endDate: [null],
        isInvolveCost: [undefined], // 收费情况
        cost: [''], // 费用只有在收费的情况下出现
    };
    initForm() {
        this._form = this.fb.group(this.initFormData)
    }
    constructor(private message: NzMessageService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private hourservice: HourService,
        private fb: FormBuilder,
        private confirmServ: NzModalService) {
    }

    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // knowledgeId: this.selectTreeId
        };

        params['trainName'] = this.searchBy.trainName;
        if (this.searchBy.trainWey) {
            params['periodTrainingWey.id'] = this.searchBy.trainWey[this.searchBy.trainWey.length - 1];
        }
        if (this.searchBy.trainType) {
            params['periodTrainingType.id'] = this.searchBy.trainType[this.searchBy.trainType.length - 1];
        }
        if (this.searchBy.periodTrainingTheme) {
            params['periodTrainingTheme.id'] = this.searchBy.periodTrainingTheme[this.searchBy.periodTrainingTheme.length - 1];
        }
        if (this.searchBy.startDate) {
            params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.endDate) {
            params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.isSubmit) {
            params['isSubmit'] = this.searchBy.isSubmit == 'false' ? false : true;
        }
        if (this.searchBy.username) {
            params['user.username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['user.displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.status) {
            params['status'] = this.searchBy.status;
        }
        if (this.searchBy.declareUserName) {
            params['declareUserName'] = this.searchBy.declareUserName;
        }
        if (this.searchBy.ownProjectGroup) {
            if (Object.prototype.toString.call(this.searchBy.ownProjectGroup) == "[object Object]") {
                params['orgIds'] = this.searchBy.ownProjectGroup;
            } else {
                // console.log(444, this.searchBy.ownProject);
                if (this.searchBy.ownProjectGroup[0] && this.searchBy.ownProjectGroup[0].id) {
                    params['orgIds'] = this.searchBy.ownProjectGroup.map(item => item.id)
                } else {
                    params['orgIds'] = this.searchBy.ownProjectGroup
                }

            }

        };
        this.hourservice.getauditdeclarelist(params, this.departId).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
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
            trainName: [],
            periodTrainingTheme: [],
            trainType: [],
            trainWey: [],
            startDate: [null],
            endDate: [null],
            username: [],
            displayName: [],
            declareUserName: [],
            isSubmit: [],
            status: [],
            ownProjectGroup: []
        })
        this.routeInfo.params.subscribe(
            params => {
                this.departId = params.departId;
            }
        )
        this.hourservice.judgeImportantAdd().subscribe(
            res => {
                this.judgeImportantAdd = res.isOpen;
            },
            err => {
                tipMessage(err);
            }
        )
        if (this.departId) {
            this.loadData();
        } else {
            this.hourservice.getCurrentUser().subscribe(
                user => {
                    if (user.managerGroup) {
                        this.searchBy.ownProjectGroup = [user.managerGroup.id];
                        this._searchForm.get('ownProjectGroup').setValue([user.managerGroup])
                    }
                    this.loadData();
                }
            )
        }
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
                this.trainWeyAllData = res.array ? res.array : []
                let rootdata = this.getTraintypeData(res.array);
                this.trainWeyRootData = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // peixun主题
        this.hourservice.gettraintheme().subscribe(
            res => {
                this.trainthemeAllData = res.array ? res.array : [];
                let rootdata = this.getTraintypeData(res.array);
                this.trainthemeRootData = this.transTraintypeData(rootdata);
            }
        )
    }

    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchBy = value;
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
                            $.toast({
                                icon: 'success',
                                text: '删除成功',
                                hideAfter: 1000,
                                position: 'top-center',
                                allowToastClose: false,
                            })
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
            return $.toast({
                icon: 'error',
                text: '请选择要删除项',
                hideAfter: 5000,
                position: 'top-center',
                allowToastClose: false,
            })
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
                        $.toast({
                            icon: 'success',
                            text: '删除成功',
                            hideAfter: 1000,
                            position: 'top-center',
                            allowToastClose: false,
                        })
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
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
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
                    isLeaf: !item.childrenCount
                })
            })
        }

        return transData;
    }
    // 去寻找某个节点对应的所有子集
    findchildrenData(trainArray, id) {
        return trainArray.filter((item, index) => {
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
            let allchildrenData = this.findchildrenData(this.traintypeAllData, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }
    loadTrainThemeData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainthemeRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainthemeAllData, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }
    loadTrainWayData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainWeyRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainWeyAllData, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }
    // 批量导入
    batchimport(event) {
        this.route.navigate(['/classhour/houraduitmanage/hourdeclarationimport'])
    }
    // 添加培训学时addfrom
    addtrainhour(event) {
        this.route.navigate(['/classhour/houraduitmanage/declarationedit'])
    }
    exporthour(event) {
        let ids = this.getIds(this.selection);
        let params = {
            ids: ids
        }
        params['trainName'] = this.searchBy.trainName;
        if (this.searchBy.trainWey) {
            params['periodTrainingWey.id'] = this.searchBy.trainWey[this.searchBy.trainWey.length - 1];
        }
        if (this.searchBy.trainType) {
            params['periodTrainingType.id'] = this.searchBy.trainType[this.searchBy.trainType.length - 1];
        }
        if (this.searchBy.periodTrainingTheme) {
            params['periodTrainingTheme.id'] = this.searchBy.periodTrainingTheme[this.searchBy.periodTrainingTheme.length - 1];
        }
        if (this.searchBy.startDate) {
            params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.endDate) {
            params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.isSubmit) {
            params['isSubmit'] = this.searchBy.isSubmit == 'false' ? false : true;
        }
        if (this.searchBy.username) {
            params['user.username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['user.displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.status) {
            params['status'] = this.searchBy.status;
        }
        if (this.searchBy.declareUserName) {
            params['declareUserName'] = this.searchBy.declareUserName;
        }
        if (this.departId) {
            params['projectId'] = this.departId
        }

        if (this.searchBy.ownProjectGroup) {
            if (Object.prototype.toString.call(this.searchBy.ownProjectGroup) == "[object Object]") {
                params['orgIds'] = this.searchBy.ownProjectGroup;
            } else {
                // console.log(444, this.searchBy.ownProject);
                if (this.searchBy.ownProjectGroup[0] && this.searchBy.ownProjectGroup[0].id) {
                    params['orgIds'] = this.searchBy.ownProjectGroup.map(item => item.id)
                } else {
                    params['orgIds'] = this.searchBy.ownProjectGroup
                }

            }

        };
        if (this.selection.length) {
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDeclarationHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,

                                fileName: '学时申报'
                            }
                            $.toast({
                                icon: 'success',
                                text: '导出成功',
                                hideAfter: 1000,
                                position: 'top-center',
                                allowToastClose: false,
                            })
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出全部？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDeclarationHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '学时申报'
                            }
                            $.toast({
                                icon: 'success',
                                text: '导出成功',
                                hideAfter: 1000,
                                position: 'top-center',
                                allowToastClose: false,
                            })
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })
        }

    }
    // 修改学员学时审核信息
    todeclartionedit(id) {
        this.route.navigate(['/classhour/houraduitmanage/declarationedit'], { queryParams: { id: id } })
    }
    // 查看人员列表
    viewpersonlist(row) {
        this.route.navigate([`/classhour/houraduitmanage/${row.id}/personlist`], { queryParams: { status: row.status } })
    }
    // 查看附件列表
    // viewattachmentlist(id) {
    //     this.route.navigate([`/classhour/houraduitmanage/${id}/attachmentlist`])
    // }
    // 批量删除获取selection中的id
    getselectionid(array: any[]) {
        let selectionarray = [];
        array.map((item, index, arrays) => {
            selectionarray.push(item.id);
        })
        return selectionarray;
    }
    judgeSubmit(array: any[]) {
        return array.some((item, index) => {
            return item.status == 'P';
        })
    }
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 学时审核的提交
    periodsubmit() {
        //  判断有无已提交的如果有已提交的则gei以提示
        if (this.selection.length) {
            let p = this.judgeMutipleDeleteSubmit(this.selection);
            if (p) {
                return $.toast({
                    icon: 'error',
                    text: '请取消已提交的项!',
                    hideAfter: 1000,
                    position: 'top-center',
                    allowToastClose: false,
                })
            } else {
                let ids = this.getIds(this.selection);

                this.confirmServ.confirm({
                    title: '提交',
                    content: '确定提交所选学时',
                    showConfirmLoading: true,
                    zIndex: 1003,
                    onOk: () => {
                        this.hourservice.periodDeclaresubmit({ ids: ids }).subscribe(
                            res => {
                                $.toast({
                                    icon: 'success',
                                    text: '提交成功',
                                    hideAfter: 1000,
                                    position: 'top-center',
                                    allowToastClose: false,
                                })
                                this.loadData();
                            },
                            err => {
                                tipMessage(err);
                            }
                        )
                    },
                    onCancel() { }
                })
            }
        } else {
            return $.toast({
                icon: 'error',
                text: '请选择要提交的项',
                hideAfter: 1000,
                position: 'top-center',
                allowToastClose: false,
            })
        }
    }
    // 删除
    delete(event) {
        // console.log(this.selection, 22)
        if (this.selection.length) {
            let self = this;
            if (this.judgeMutipleDeleteSubmit(this.selection)) {
                return tipMessage('不可删除已提交或已通过项', 'error', 5000);
            }
            let params = this.getselectionid(this.selection);
            this.confirmServ.confirm({
                title: '批量删除',
                content: '您确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletedeclarhour(params).subscribe(
                        (res) => {
                            $.toast({
                                icon: 'success',
                                text: '删除成功',
                                hideAfter: 1000,
                                position: 'top-center',
                                allowToastClose: false,
                            })
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
            return $.toast({
                icon: 'error',
                text: '请选择要删除项',
                hideAfter: 1000,
                position: 'top-center',
                allowToastClose: false,
            });
        }
    }
    // 批量更新
    mutipleUpdate() {
        if (this.selection.length == 0) {
            return $.toast({
                icon: 'error',
                text: '请选择要更新的项',
                hideAfter: 3000,
                position: 'top-center',
                allowToastClose: false,
            })
        }
        // 待审核与已审核的不可以批量更新
        if (this.judgeUpdate(this.selection)) {
            return $.toast({
                icon: 'error',
                text: '只可批量更新未审核项',
                hideAfter: 5000,
                position: 'top-center',
                allowToastClose: false,
            })
        }
        this.spinningUpdate = true;
        this.isVisible = true;
        this.initForm();
        this.hourservice.gettraintypeall().subscribe(
            res => {
                this.traintypeAllDataUpdate = res.array;
                let rootdata = this.getTraintypeData(res.array);
                this.traintypeRootDataUpdate = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // 培训方式
        this.hourservice.gettrainweyall().subscribe(
            res => {
                this.trainWeyAllDataUpdate = res.array ? res.array : [];
                let rootdata = this.getTraintypeData(res.array);
                this.trainWeyRootDataUpdate = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // 培训来源
        this.hourservice.gettrainsource().subscribe(
            res => {
                this.trainsourceAllDataUpdate = res.array ? res.array : [];
                let rootdata = this.getTraintypeData(res.array);
                this.trainsourceRootDataUpdate = this.transTraintypeData(rootdata);
                this.spinningUpdate = false;
            },
            err => {
                this.spinningUpdate = false;
                return tipMessage(err);
            }
        )
        // peixun主题
        this.hourservice.gettraintheme().subscribe(
            res => {
                this.trainthemeAllDataUpdate = res.array ? res.array : [];
                let rootdata = this.getTraintypeData(res.array);
                this.trainthemeRootDataUpdate = this.transTraintypeData(rootdata);
            }
        )
    }
    // 批量审核
    batchrefuse() {
        if (this.selection.length == 0) {
            return $.toast({
                icon: 'error',
                text: '请选择批量审核项',
                position: 'top-center',
                hideAfter: 1000,
                allowToastClose: false,
            })
        }
        if (!this.judgeRefuse(this.selection)) {
            return $.toast({
                icon: 'error',
                text: '只可审核待审核项,请只选择待审核项！',
                position: 'top-center',
                hideAfter: 5000,
                allowToastClose: false,
            })
        }

        this.isVisibleRefuse = true;
    }
    handleOkRefuse(event) {

    }
    handleCancelRefuse(event) {
        this.isVisibleRefuse = false;
        this.cpbtnstate = false;
        this.textcontent = '';
        this.crbtnstate = false;
    }

    chooseUserPass() {
        let value = this.textcontent ? this.textcontent.replace(/^\s*|\s*$/g, '') : '';
        if (value != null && value.length > 2000) {
            return $.toast({
                icon: 'error',
                text: '字数不能超过2000字！',
                position: 'top-center',
                hideAfter: 1000,
                allowToastClose: false,
            })
        }
        this.cpbtnstate = true;
        let ids = this.getids(this.selection);
        let params = {
            status: 'P',
            auditOpinion: value,
            ids: ids,
        };
        this.publicRefuseMethod(params);
    }
    chooseUserRefuse() {
        let value = this.textcontent ? this.textcontent.replace(/^\s*|\s*$/g, '') : '';
        if (value != null && value.length > 2000) {
            return $.toast({
                icon: 'error',
                text: '字数不能超过2000字！',
                position: 'top-center',
                hideAfter: 1000,
                allowToastClose: false,
            })
        }
        this.crbtnstate = true;
        let ids = this.getids(this.selection);
        let params = {
            status: 'R',
            auditOpinion: value,
            ids: ids,
        };
        this.publicRefuseMethod(params);
    }
    publicRefuseMethod(params) {
        this.hourservice.mutipleRfuse(params).subscribe(
            res => {
                this.cpbtnstate = false;
                this.textcontent = '';
                this.crbtnstate = false;
                this.isVisibleRefuse = false;
                this.loadData();
            },
            err => {
                this.cpbtnstate = false;
                this.textcontent = '';
                this.crbtnstate = false;
                this.isVisibleRefuse = false;
                tipMessage(err);
            }
        )
    }
    // 取消
    handleCancel(event) {
        this.isVisible = false;
    }
    goBack() {
        this.isVisible = false;
    }
    // 判断是否可以批量
    judgeUpdate(array: any[]) {
        return array.some((item) => {
            return item.status == 'P' || item.status == 'M';
        })
    }

    judgeRefuse(array: any[]) {
        return array.every((item) => {
            return item.status == 'M';
        })
    }
    // 加载培训类型
    loadDataUpdate(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.traintypeRootDataUpdate);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.traintypeAllDataUpdate, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }

    }
    loadDataTrainWayUpdate(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainWeyRootDataUpdate);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainWeyAllDataUpdate, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }

    }
    loadDataThemeUpdate(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainthemeRootDataUpdate);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainthemeAllDataUpdate, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }

    }
    loadDataSourceUpdate(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainsourceRootDataUpdate);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainsourceAllDataUpdate, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }

    }
    // 选择收费方式
    _consoleisInvolveCost(event) {
        if (event == 1) {
            this.isFreeCost = true;
        } else {
            this.isFreeCost = false
        }
    }
    // 培训形式的选择
    _consoletrainForm(event) {
        if (event == 'OTHER') {
            this.trainFormDes = true
        } else {
            this.trainFormDes = false;
        }
    }
    // 上传文件
    onFileUpload(result) {
        console.log(result);
        this.files = this.resfiles.concat(result);
        this.files = this.judgeremovefile(this.remarkArray, this.files)

    }
    // 删除文件
    removeUploadfile(onlyFile) {
        this.remarkArray.push(onlyFile);
        this.files = this.getDataOnly(onlyFile, this.files);

    }
    // 过滤唯一对应的数据
    getDataOnly(onlyTip, array: any[]) {
        let onlyFile = [];
        return array.filter((item, index) => {
            return item.relativePath !== onlyTip
        })
    }
    // 判断去除已删除的文件流
    judgeremovefile(removearray: any[], array: any[]) {
        return array.filter((item, index) => {
            return removearray.indexOf(item.relativePath) == -1;
        })
    }
    _saveformmessage($event, value) {
        $event.preventDefault();
        // console.log(value, Object.keys(value), 123)
        // 判断空对象
        if (this.judgevalueno(value, Object.keys(value))) {
            return $.toast({
                icon: 'error',
                text: '没有填写要更新的项',
                hideAfter: 1000,
                position: 'top-center',
                allowToastClose: false,
            })
        }
        let trainTypeId, trainThemeId, trainSourceId, trainWeyId;
        if (value['periodTrainingType']) {
            if (Object.prototype.toString.call(value['periodTrainingType'][0]) == '[object Object]') {
                let index = value['periodTrainingType'].length - 1;
                trainTypeId = value['periodTrainingType'][index].value;
            } else {
                let index = value['periodTrainingType'].length - 1;
                trainTypeId = value['periodTrainingType'][index];
            }
            // console.log(value['periodTrainingType'], index, trainTypeId, 4444)
        }
        if (value['periodTrainingTheme']) {
            let index = value['periodTrainingTheme'].length - 1;
            trainThemeId = value['periodTrainingTheme'][index];
        }
        if (value['periodTrainingSource']) {
            let index = value['periodTrainingSource'].length - 1;
            trainSourceId = value['periodTrainingSource'][index];
        }
        if (value['periodTrainingWey']) {
            let index = value['periodTrainingWey'].length - 1;
            trainWeyId = value['periodTrainingWey'][index]
        }
        let params = {
            ...value,
            attachs: this.files,
            "periodTrainingTheme": { id: value['periodTrainingTheme'] ? trainThemeId : null },
            "periodTrainingSource": { id: value['periodTrainingSource'] ? trainSourceId : null },
            "periodTrainingType": { id: value['periodTrainingType'] ? trainTypeId : null },
            "periodTrainingWey": { id: value['periodTrainingWey'] ? trainWeyId : null },
            /* "userGroup": value['userGroup'] ? { id: value['userGroup'].id } : null, */
            startDate: value.startDate ? moment(value.startDate).format('YYYY-MM-DD') : null,
            endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : null,
            ids: this.getIds(this.selection)
        }

        // console.log(params, 3323)
        if (!params.periodTrainingSource.id) {
            delete params.periodTrainingSource
        }
        if (!params['periodTrainingTheme.id']) {
            delete params['periodTrainingTheme']
        }
        if (!params['periodTrainingSource.id']) {
            delete params['periodTrainingSource']
        }
        if (!params['periodTrainingType.id']) {
            delete params['periodTrainingType']
        }
        if (!params['periodTrainingWey.id']) {
            delete params['periodTrainingWey']
        }
        /* if (!params['userGroup']) {
            delete params['userGroup']
        } */
        if (!this.isFreeCost) {
            delete params['cost']
        }
        if (!this.trainFormDes) {
            delete params['otherTypeDescription']
        }
        if (!this.files.length) {
            delete params['attachs']
        }
        this.btnstate = true;
        this.hourservice.mutipleUpdate(params).subscribe((res) => {
            this.isVisible = false;
            this.loadData();
            this.btnstate = false;
        },
            err => {
                tipMessage(err);
                this.btnstate = false;
            }
        )
    }
    // 判断是否可以选择
    judgecheckabled() {
        this.testListData.content.forEach((item) => {
            if (item.status == 'P' || item.status == 'M') {
                item.checkable = false;
            }
        })
    }
    // 判断值是不是没有
    judgevalueno(value, array: any[]) {
        return array.every((item) => {
            return !value[item]
        })
    }
    // panduan是否可以批量删除批量提交
    judgeMutipleDeleteSubmit(array: any[]) {
        return array.some((item) => {
            return item.status == 'P' || item.status == 'M';
        })
    }

}
