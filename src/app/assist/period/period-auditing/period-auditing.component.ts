import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { PeriodApiService } from '../period-api.service';
import { ImportMessage } from './utils/importmessage';
import { AuthService } from 'app/core/auth/auth.service';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'spk-period-auditing',
    templateUrl: './period-auditing.component.html',
    styleUrls: ['./period-auditing.component.scss']
})
export class PeriodAuditingComponent implements OnInit {
    _searchForm: FormGroup;
    _form: FormGroup;
    departId;
    spinning: boolean = true;
    _allChecked = false; // 表格的选择
    _indeterminate = false;
    _displayData = []; // 当前页数据
    selection: any[] = []; // 选择的数据
    pageSize = 10;
    pageIndex = 1;
    total: any = 0;
    isImportVisible: boolean = false; // 批量导入modal
    annualPlanId: number; // 年度计划id
    taskKey: string;
    progress = 0;
    parsedData;
    tipmessage?: ImportMessage[];
    status: string;
    messageShow: boolean;
    // 编辑的modal
    isVisible: boolean = false;
    editspinning: boolean = false;
    uploadfilename: any = undefined; // 上传文件的名字
    files: any = []; // 上传文件流
    resfiles: any = []; // 编辑返回
    remarkArray: any = []; // 标记删除上传文件数组
    traintypeRootData: any; // 培训类型根节点数据
    traintypeAllData: any[] = []; // 培训类型所有数据
    _valueTrainType: any[] = []; // 培训类型
    _valueTrainTheme: any[] = null;
    _valueTrainSource: any[] = null;
    _valueTrainWey: any[] = null;
    valueTrainThemeData = [];
    valueTrainWayData = [];
    valueTrainSourceData = [];
    typeId: any; // huixian
    userGroupName: any; // 编辑回显
    _vaueUserGroup: any[] = []; // zhuban单位
    trainwayRootData: any; // 培训方式根节点数据
    trainwayAllData: any[] = []; // 培训方式所有数据
    trainthemeRootData: any; // 培训主题根节点数据
    trainthemeAllData: any[] = []; // 培训主题所有数据
    trainsourceRootData: any; // 培训来源根节点数据
    trainsourceAllData: any[] = []; // 培训来源所有数据
    traincompanyData: any[] = []; // 培训单位
    valueTrainTypeData = [];
    trainFormDes: any; // 其他编辑的其他描述显示影藏
    isFreeCost: any; // 收费显示影藏
    btnstate: boolean = false; // 提交表单的loading效果
    editperiodId: any;

    _value: any[] = []; // 用户组选择
    isVisibleUserGroup: boolean = false;
    spinningUser: boolean = false;
    datauser: any;
    selectionUserGroup: any[] = [];
    searchtext;
    judgeImportantAdd: boolean = true;
    isVisiblePeriodDetail: boolean = false;
    periodDetailspinning: boolean = false;
    viewperiodDetailData: any;
    periodTrainTypeValue: any = [];
    /* periodUserGroupValue: any = []; */
    _startDate = null;
    _endDate = null;
    carryoverYear;
    user;
    failmessage: any; // 导入失败信息
    searchBy: {
        trainName?: any,
        startDate?: any,
        endDate?: any,
        status?: any,
        username?: any,
        displayName?: any,
        declareUserName?: any
    } = {};
    data: any[] = [];
    // 导入提示
    messageColumns = [
        // { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    columns = [
        { title: '培训名称', tpl: 'trainName', styleClass: 'fixwidth' },
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '申报人', tpl: 'declareUserName' },
        { title: '培训主题', tpl: 'periodTrainingTheme' },
        // { title: '开始日期', tpl: 'startDate' },
        // { title: '结束日期', tpl: 'endDate' },
        // { title: '实际培训天数', data: 'trainDays', styleClass: 'text-center' },
        // { title: '培训学时', data: 'periodNumber', styleClass: 'text-center' },
        // { title: '培训人数', data: 'trainPeople', styleClass: 'text-center' },
        // { title: '培训地点', data: 'trainPlace' },
        { title: '审核状态', tpl: 'status' },
        { title: '审核日志', tpl: 'console' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    // 用户
    columnsuser: any[] = [
        { title: 'ID', data: 'id' },
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '手机号', data: 'phoneNumber' },
        { title: '邮箱', data: 'email' },
        { title: '性别', data: 'sex', tpl: 'sex' },
        { title: '所属组织', tpl: 'userGroup', visible: true },
        { title: '开始日期', data: 'startDate', visible: false },
        { title: '到期日期', data: 'endDate', visible: false },
        { title: '状态', data: 'status', tpl: 'statusCol' }
    ];
    logData: any[] = [];
    spinningLog: boolean = true;
    showAuditLog: boolean = true;
    isLogVisible: boolean = false;
    logColumns = [
        { title: '审核人工号', data: 'username' },
        { title: '审核人姓名', data: 'displayName' },
        { title: '审核意见', data: 'auditOpinion' },
        { title: '通过/拒绝', tpl: 'status' },
        { title: '审核日期', tpl: 'lastModifiedDate' },
    ]
    // 添加表单初始化
    initFormData: any = {
        trainName: ['', [Validators.required]], // 培训名称
        trainPlace: ['', [Validators.required]], // 培训地点
        periodNumber: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]], // 培训学时
        /* trainPeople: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], */ // 培训人数
        trainContent: ['', [Validators.required]], // 培训内容
        trainDays: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]], // 培训天数
        'periodTrainingWey': [null], // 培训方式
        otherTypeDescription: [''], // 当培训形式为其他时显示培训形式描述
        trainForm: [undefined], // 培训形式
        'periodTrainingTheme': [undefined, [Validators.required]], // 培训主题
        'periodTrainingSource': [null], // 培训来源
        'periodTrainingType': [null], // 培训类型
        'userGroupName': [''], // 主办单位
        remark: [''], // 描述
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required]],
        isInvolveCost: [undefined], // 收费情况
        cost: [''], // 费用只有在收费的情况下出现
    };
    // 初始化search表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            trainName: [],
            startDate: [],
            endDate: [],
            status: [],
            username: [],
            displayName: [],
            declareUserName: []
        });
    }
    // 加载列表数据
    loadListData() {
        this.spinning = true;
        let params = {
            page: this.pageIndex - 1,
            size: this.pageSize,
        }
        if (this.searchBy.trainName) {
            params['trainName'] = this.searchBy.trainName;
        }
        if (this.searchBy.startDate) {
            params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.endDate) {
            params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD');
        }
        if (this.searchBy.status) {
            params['status'] = this.searchBy.status;
        }
        if (this.searchBy.username) {
            params['user.username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['user.displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.declareUserName) {
            params['declareUserName'] = this.searchBy.declareUserName;
        }
        this.service.getpersonlist(this.departId, params).subscribe(
            res => {
                // console.log(res);
                this.data = res.content;
                this.spinning = false;
                this.total = res.totalElements;
                this._displayData = res.content;
                this.selection = [];
                this._allChecked = false;
                this._indeterminate = false;
            },
            err => {
                this.spinning = false;
                return tipMessage(err, 'error');
            }
        )
    }
    constructor(
        private confirmServ: NzModalService,
        private service: PeriodApiService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
    ) {

    }

    ngOnInit() {
        this.initSearchForm();
        // 导入提示
        this.routeInfo.params.subscribe((params) => {
            this.departId = params.departId;
        })
        this.tipmessage = [];
        this.loadListData();
        this.authService.loginfo().subscribe(
            user => {
                // console.log(user);
                this.user = user.user;
                this.initLoadApi(this.user);
            }
        )
    }
    initLoadApi(user) {
        // 判断是否可以添加
        this.service.judgeImportantAdd().subscribe(
            res => {
                this.judgeImportantAdd = res.isOpen;

            },
            err => {
                tipMessage(err, 'error')
            }
        )
        // 获取三级联动的数据
        this.service.gettraintypeall().subscribe(
            res => {
                // console.log(res, '分类');
                this.traintypeAllData = res.array;
                let rootdata = this.getTrainData(res.array);
                this.traintypeRootData = this.transTrainData(rootdata);
                // console.log(this.traintypeRootData, 345);
            },
            err => {
                return tipMessage(err, 'error');
            }
        )
        // 培训方式
        this.service.gettrainweyall().subscribe(
            res => {
                // console.log(res, '培训方式')
                // tslint:disable-next-line:whitespace
                this.trainwayAllData = res.array;
                let rootdata = this.getTrainData(res.array);
                this.trainwayRootData = this.transTrainData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // peixun主题
        this.service.gettraintheme().subscribe(
            res => {
                this.trainthemeAllData = res.array;
                let rootdata = this.getTrainData(res.array);
                this.trainthemeRootData = this.transTrainData(rootdata);
            }
        )
        // 培训来源
        this.service.gettrainsource().subscribe(
            res => {
                this.trainsourceAllData = res.array;
                let rootdata = this.getTrainData(res.array);
                this.trainsourceRootData = this.transTrainData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // 培训单位
        this.service.gettrainunit({
            parentId: user && user.id,
        }).subscribe(
            res => {
                this.traincompanyData = this.getuserData(res);
            },
            err => {
                return tipMessage(err);
            }
            )
        this.service.getCarryOverYear().subscribe(
            res => {
                this.carryoverYear = res ? res.year : undefined;
            }
        )
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.pageIndex = 1;
        this.pageSize = 10;
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadListData();
    }

    // 培训类型三级联动
    // 加载培训类型
    loadTrainTypeData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // console.log(e)
        // root根节点
        if (e.index === -1) {
            e.resolve(this.traintypeRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(e.option.value, this.traintypeAllData);
            let childrenData = this.transTrainData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }
    // 培训方式和渠道三级联动
    // 加载培训方式和渠道
    loadTrainWeyData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // console.log(e)
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainwayRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(e.option.value, this.trainwayAllData);
            let childrenData = this.transTrainData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }

    // 培训主题三级联动
    // 加载培训主题
    loadTrainThemeData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        console.log(e)
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainthemeRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(e.option.value, this.trainthemeAllData);
            let childrenData = this.transTrainData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }

    // 培训来源三级联动
    // 加载培训来源
    loadTrainSourceData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // console.log(e)
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainsourceRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(e.option.value, this.trainsourceAllData);
            let childrenData = this.transTrainData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
        }
    }


    // 培训单位
    loadUserData(e: { option: any, index: number, resolve: Function, reject: Function }) {

        if (e.index === -1) {
            e.resolve(this.traincompanyData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let params = {
                parentId: e.option.value,
            }
            this.service.gettrainunit(params).subscribe(
                res => {
                    e.option.loading = false;
                    let children = this.getuserData(res);
                    e.resolve(children);
                }
            )
        }
    }
    // 对数据进行遍历转化为三级联动所需的形式
    transTrainData(array: any[]) {
        let transData = [];
        if (array.length) {
            array.map((item, index) => {
                transData.push({
                    value: item.id,
                    label: item.name,
                    isLeaf: !item.childrenCount || item.childrenCount == 0
                })
            })
        }

        return transData;
    }
    // 将数据转化为三级联动所需
    getuserData(array: any[]) {
        let listData = [];
        array.map((item, index) => {
            if (item.name && item.id) {
                listData.push({
                    value: item.id,
                    label: item.name,
                    isLeaf: !item.hasChildren
                })
            }

        })
        return listData;
    }
    // 获取数据的rootdata
    getTrainData(array: any[]) {
        return array.filter((item, index) => {
            return item.parent == null
        })
    }
    // 去寻找某个节点对应的所有子集
    findchildrenData(id, array: any[]) {
        return array.filter((item, index) => {
            if (item.parent) {
                return item.parent.id == id;
            }
        })
    }
    // 编辑学时
    editperiod(id) {
        // console.log(id, '编辑学时');
        this.editperiodId = id;
        this.editspinning = true;
        this.isVisible = true;
        this._form = this.fb.group(this.initFormData);
        this.service.viewperiod(id).subscribe(
            res => {
                // console.log(res, 'bianji')
                this._endDate = res.endDate ? new Date(res.endDate) : null;
                this._startDate = res.startDate ? new Date(res.startDate) : null;
                if (res.trainForm && res.trainForm == 'OTHER') {
                    this.trainFormDes = true;
                }
                if (res.isInvolveCost) {
                    this.isFreeCost = true;
                }
                this._value = res.user ? [res.user] : [];
                this.resfiles = res.attachs ? res.attachs : [];
                this.files = res.attachs ? res.attachs : [];
                // tslint:disable-next-line:forin
                for (let key in this.initFormData) {
                    this.initFormData[key] = [res[key], this.initFormData[key][1]]
                    this._form = this.fb.group(this.initFormData);
                }
                this.getcascaderValue(res.periodTrainingSource, this.valueTrainSourceData);
                this.getcascaderValue(res.periodTrainingTheme, this.valueTrainThemeData);
                this.getcascaderValue(res.periodTrainingWey, this.valueTrainWayData);
                this.getcascaderValue(res.periodTrainingType, this.valueTrainTypeData)
                this._valueTrainSource = this.valueTrainSourceData;
                this._valueTrainTheme = this.valueTrainThemeData;
                this._valueTrainWey = this.valueTrainWayData;
                this._valueTrainType = this.valueTrainTypeData;
                // tslint:disable-next-line:forin
                for (let key in this.initFormData) {
                    if (key == 'isInvolveCost') {
                        this._form.get('isInvolveCost').setValue(res[key] ? 1 : 0)
                        // this.initFormData[key] = [res[key] ? 1 : 0, this.initFormData[key][1]]
                    }
                    /* if (key == 'userGroup' && res[key] != null) {
                        let m = res['userGroup'].namePath ? res['userGroup'].namePath.split(',') : [];
                        this.userGroupId = res[key].id
                        this._vaueUserGroup = m;
                    } */
                }
                this.editspinning = false;
            },
            err => {
                this.editspinning = false;
                return tipMessage(err);
            }
        )
    }
    // 弹窗的显示影藏
    handleCancel(event) {
        this.resetForm();
    }
    resetForm() {
        this.btnstate = false;
        // 关闭弹窗刷新列表
        this.isVisible = false;
        this.isFreeCost = undefined;
        this.trainFormDes = undefined;
        this._valueTrainType = [];
        this._vaueUserGroup = [];
        this.resfiles = [];
        this.remarkArray = [];
        this.files = [];
        this._value = [];
        this.valueTrainThemeData = [];
        this.valueTrainWayData = [];
        this.valueTrainSourceData = [];
        this.valueTrainTypeData = [];
        this._valueTrainSource = [];
        this._valueTrainTheme = [];
        this._valueTrainWey = [];
        this.editperiodId = undefined;
        this.typeId = undefined;
        this.userGroupName = [];
        this.files = [];
        this._startDate = null;
        this._endDate = null;
    }
    // 选择用户
    loadUserGoupData() {
        this.spinningUser = true;
        let params = {
            searchtext: this.searchtext,
            page: this.datauser ? this.datauser.number : 0,
            size: this.datauser ? this.datauser.size : 10,
        };
        this.service.getUserGroupList(params).subscribe(
            obj => {
                this.datauser = obj;
                this.spinningUser = false;
            },
            err => {
                this.spinningUser = false;
            }
        );
    }
    openLookup() {
        this.isVisibleUserGroup = true;
        this.loadUserGoupData();
    }
    handleCancelUserGroup(event) {
        this._value = this._value;
        this.selectionUserGroup = [];
        this.isVisibleUserGroup = false;
    }
    handleOkUserGroup(event) {
        this._value = this._value.concat(this.filterHasUser(this.selectionUserGroup));
        // console.log(this._value, this.selectionUserGroup);
        this.isVisibleUserGroup = false;
        this.selectionUserGroup = [];
    }
    _remove(event, u, _value) {
        // console.log(u, _value);
        // tslint:disable-next-line:no-arg
        let e = arguments[0] || event;
        if (e && e.stopPropagation) {
            e.stopPropagation()
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        // event.stopPropagation();
        this._value = _value.filter((item) => {
            return item.id != u.id;
        })
    }
    filterHasUser(array: any[]) {
        return array.filter((item, index) => {
            return this.getids(this._value).indexOf(item.id) == -1;
        })
    }
    getcascaderValue(obj, array: any[]) {
        if (obj) {
            array.unshift({
                value: obj.id,
                label: obj.name
            })
            if (obj.parent) {
                this.getcascaderValue(obj.parent, array)
            }
        } else {
            array = []
        }
    }
    // quxiao
    goBack() {
        this.resetForm();
    }
    // 选择培训形式
    choosetrainForm(event) {
        // console.log(event, 444);
        if (event == 'OTHER') {
            this.trainFormDes = true;
        } else {
            this.trainFormDes = false;
        }
    }
    // 选择是否收费
    _consoleisInvolveCost(event) {
        console.log(event);
        if (event) {
            this.isFreeCost = true;
        } else {
            this.isFreeCost = false;
        }
    }
    // 上传文件
    changeuploadfile(event) {
        let file = event.currentTarget.files[0]
        let filduploadType = event.target.value;
        this.uploadfilename = file.name

        if (filduploadType.indexOf('psd') != -1) {
            this.files = '';
            return tipMessage('不可上传psd文件！');
        } else {
            this.files = file;
        }
        console.log(file, filduploadType, 'uploadfile');
    }
    // 删除上传文件
    removefile() {
        let file = document.getElementById('fileId');
        if (file.outerHTML) {
            file.outerHTML = file.outerHTML;
        } else { // FF(包括3.5)
            file['value'] = '';
        }
        this.files = '';
        this.uploadfilename = undefined;
        tipMessage('删除成功', 'success');
    }

    getChildId(type, value) {
        let index;
        if (value[type]) {
            if (Object.prototype.toString.call(value[type][0]) == '[object Object]') {
                index = value[type].length - 1;
                return value[type][index].value;
            } else {
                if (typeof value[type][0] == 'number') {
                    index = value[type].length - 1;
                    return value[type][index];
                } else if (value[type].length == 0) {
                    return undefined;
                } else {
                    return this.typeId;
                }
            }
        }
    }

    // 保存
    _saveformmessage(event, value) {
        // console.log(value, 333)
        if (this._form.invalid) {
            return tipMessage('请按要求填写！');
        }
        if (this._value.length == 0) {
            return tipMessage('请选择用户！');
        }
        if (this.carryoverYear) {
            if (new Date(value.endDate).getFullYear() <= this.carryoverYear) {
                return tipMessage(`结束时间不能小于最近结转年份${this.carryoverYear}年`, '', 5000);
            }
        }
        this.btnstate = true;
        let index;
        let trainTypeId;
        let userGroupId;
        let themeId;
        let weyId;
        let sourceId;
        themeId = this.getChildId('periodTrainingTheme', value);
        weyId = this.getChildId('periodTrainingWey', value);
        sourceId = this.getChildId('periodTrainingSource', value);
        trainTypeId = this.getChildId('periodTrainingType', value);
        userGroupId = this.getChildId('userGroup', value);

        let params = {
            ...value,
            attachs: this.files,
            userIds: this.getids(this._value),
            'periodTrainingTheme': { id: value['periodTrainingTheme'] ? themeId : null },
            'periodTrainingSource': { id: value['periodTrainingSource'] ? sourceId : null },
            'periodTrainingType': { id: value['periodTrainingType'] ? trainTypeId : null },
            'periodTrainingWey': { id: value['periodTrainingWey'] ? weyId : null },
            'userGroup': { id: value['userGroup'] ? userGroupId : null },
        }
        // console.log(params, 3323)
        if (!params['periodTrainingSource'].id) {
            delete params['periodTrainingSource']
        }
        if (!params['periodTrainingType'].id) {
            delete params['periodTrainingType']
        }
        if (!params['periodTrainingWey'].id) {
            delete params['periodTrainingWey']
        }
        if (!params['userGroup'].id) {
            delete params['userGroup']
        }
        if (!this.isFreeCost) {
            delete params['cost']
        }
        if (!this.trainFormDes) {
            delete params['otherTypeDescription']
        }


        // console.log(params, 444);
        if (this.editperiodId) {
            // 编辑
            this.service.editperiod(this.editperiodId, this.departId, params).subscribe(
                res => {
                    tipMessage('编辑成功！', 'success');
                    this.resetForm();
                    this.pageIndex = 1;
                    this.loadListData();

                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        } else {
            // 添加
            this.service.addperiod(this.departId, params).subscribe(
                res => {
                    tipMessage('添加成功！', 'success');
                    this.resetForm();
                    this.pageIndex = 1;
                    this.loadListData();
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
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
    // 切换分页
    _changePage(event) {
        this.pageIndex = event;
        this.loadListData();
    }
    // 分页条数修改
    _pageSizeChane(event) {
        this.pageSize = event;
        this.loadListData();
    }
    // 单选多选操作

    _refreshStatus(event?: any) {
        // 请求数据将数据赋值给this._displayData
        // console.log(event, 4444)
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }
    // 全选操作
    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => {
                data.checked = true;
            });
        } else {
            this._displayData.forEach(data => {
                data.checked = false;
            });
        }
        this._refreshStatus();
    }
    // 批量删除
    batchDelete() {
        this.selection = this.getselection(this._displayData);
        if (this.selection.length) {
            let isdelete = this.judgesubmit(this.selection)
            if (isdelete) {
                return tipMessage('只能删除未提交及审批已拒绝的项！');
            }
            let ids = this.getids(this.selection);
            this.confirmServ.confirm({
                title: '删除！',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.batchDelete(ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadListData();
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })

        } else {
            return tipMessage('请选择要删除的项！');
        }
    }
    // 提交学时
    submitperiod() {
        this.selection = this.getselection(this._displayData);
        if (this.selection.length) {
            // 判断是否可以提交
            let judge = this.judgesubmit(this.selection);
            if (judge) {
                return tipMessage('只可以提交未提交审批和审批拒绝项！');
            }
            let ids = this.getids(this.selection);
            console.log(ids);
            let params = {
                ids: ids
            }
            this.confirmServ.confirm({
                title: '提交学时！',
                content: '确定要提交所选学时？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.submitperiod(params).subscribe(
                        res => {
                            tipMessage('提交成功！', 'success');
                            this.loadListData();
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })

        } else {
            return tipMessage('请选择要提交的项！');
        }
    }

    // 批量导入学时
    batchImport() {
        this.isImportVisible = true;
    }
    // 批量导入modal的显示影藏
    handleCancelImport(event) {
        this.initImportForm();
        if (this.status == 'success') {
            this.loadListData();
        }
    }
    handleOkImportant(event) {
        this.initImportForm();
        if (this.status == 'success') {
            this.loadListData();
        }
    }

    initImportForm() {
        this.isImportVisible = false;
        this.taskKey = undefined;
        this.progress = 0;
        this.parsedData = undefined;
        this.tipmessage = [];
        this.status = undefined;
        this.messageShow = undefined;
        this.failmessage = undefined;
    }
    // 导入的操作
    onUploadComplete(fileupload) {
        if (fileupload) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();
            this.failmessage = undefined;
        }
    }

    import() {
        this.status = 'importing';
        this.service.import(this.annualPlanId, this.departId, this.taskKey).subscribe(
            errorList => {
                if (errorList.length !== 0) {
                    // console.log(111)
                    this.tipmessage = errorList;
                    tipMessage('导入失败');
                    this.status = 'after';
                    this.messageShow = true;
                } else {
                    // console.log(222)
                    setTimeout(() => {
                        this.initImportForm();
                        this.loadListData();
                    }, 3000)
                    tipMessage('导入成功', 'success');
                    this.status = 'success';
                    this.messageShow = false;
                }
            }
        )
    }

    getImportProgress() {
        this.service.importProgress(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    // this.interval = setInterval(this.getImportProgress, 1000)
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                } else {
                    if (m.status == 'false') {
                        this.status = 'ansyfail';
                        this.failmessage = m.msg;
                    } else {
                        this.parsedData = m['parsedData'];
                        this.status = 'before';
                        if (!this.parsedData) {
                            this.getImportProgress();
                        }
                    }
                }
            }
        );
    }
    // 导出错误信息
    downloaderrorfile() {
        let params = {
            taskKey: this.taskKey
        }
        this.service.downloaderrorfile(params).subscribe(
            res => {
                // console.log(res, 112);
                let paramsObj = {
                    fileName: res.sessionName,
                    sessionName: res.sessionName
                }
                this.service.exportdownloaderror(paramsObj);
            }
        )
    }
    downloadhourfile() {
        this.service.downloadhourfile().subscribe(
            res => {
                let params = {
                    fileName: '学时导入模板',
                    sessionName: res.sessionName
                }
                this.service.exportdownloaderror(params);
            }
        )
    }
    // 选择的selection数据
    getselection(array: any[]) {
        let selection = [];
        array.map((item, index) => {
            if (item.checked) {
                selection.push(item);
            }
        })
        return selection;
    }
    // 获取ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 判断是否可以tijiao
    judgesubmit(array: any[]) {
        return array.some((item, index) => {
            return item.status == 'A' || item.status == 'M' || item.status == 'P';
        })
    }
    // 添加
    addperiod() {
        this.isVisible = true;
        this.isVisible = true;
        // tslint:disable-next-line:forin
        for (let key in this.initFormData) {
            this.initFormData[key] = [null, this.initFormData[key][1]];
        }
        this._valueTrainType = [];
        this._vaueUserGroup = [];
        this._form = this.fb.group(this.initFormData);
    }
    // daochu
    exportdeclare() {
        this.selection = this.getselection(this._displayData);
        if (this.selection.length) {
            let ids = this.getids(this.selection);
            let params = {
                ids: ids,
                projectId: this.departId
            }
            if (this.searchBy.trainName) {
                params['trainName'] = this.searchBy.trainName;
            }
            if (this.searchBy.startDate) {
                params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD')
            }
            if (this.searchBy.endDate) {
                params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD')
            }
            if (this.searchBy.status) {
                params['status'] = this.searchBy.status
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodAuditExport(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时申报'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadListData();
                        },
                        err => {

                        }
                    )

                },
                onCancel() { }
            })
        } else {
            let params = {
                projectId: this.departId
            }
            if (this.searchBy.trainName) {
                params['trainName'] = this.searchBy.trainName;
            }
            if (this.searchBy.startDate) {
                params['startDate'] = moment(this.searchBy.startDate).format('YYYY-MM-DD');
            }
            if (this.searchBy.endDate) {
                params['endDate'] = moment(this.searchBy.endDate).format('YYYY-MM-DD');
            }
            if (this.searchBy.status) {
                params['status'] = this.searchBy.status;
            }
            if (this.searchBy.username) {
                params['user.username'] = this.searchBy.username;
            }
            if (this.searchBy.displayName) {
                params['user.displayName'] = this.searchBy.displayName;
            }
            if (this.searchBy.declareUserName) {
                params['declareUserName'] = this.searchBy.declareUserName;
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出全部？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodAuditExport(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时申报'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadListData();
                        }
                    )
                },
                onCancel() { }
            })
        }
    }
    showAuditLogByID(id) {
        this.isLogVisible = true;
        let params = {
            'periodActiveInformation.id': id
        }
        this.service.getPeriodAuditLogByPeriodId(params).subscribe(
            res => {
                this.logData = res.content;
                this.spinningLog = false;
            }, err => {
                this.spinningLog = true;
                return tipMessage(err);
            }
        );
    }
    closeAuditLog(event) {
        this.isLogVisible = false;
        this.logData = [];
        this.btnstate = false;
        this.editperiodId = undefined;
        this.isFreeCost = undefined;
        this.trainFormDes = undefined;
        this.typeId = undefined;
        this.userGroupName = [];
        this.resfiles = [];
        this.remarkArray = [];
        this.files = [];
    }
    // 查看学时详情
    viewPeriodDetail(id) {
        this.isVisiblePeriodDetail = true;
        this.periodDetailspinning = true;
        this.service.viewperiod(id).subscribe(
            res => {
                this.periodDetailspinning = false;
                this.viewperiodDetailData = res;
                // console.log(this.viewperiodDetailData);
                this.getTrainType(this.viewperiodDetailData.periodTrainingType);
                // console.log(this.periodTrainTypeValue);
            },
            err => {
                this.periodDetailspinning = false;
                tipMessage(err);
            }
        )
    }
    // 弹窗的关闭影藏
    closePeriodDetail(event) {
        this.isVisiblePeriodDetail = false;
        this.viewperiodDetailData = undefined;
        this.periodTrainTypeValue = [];
        /* this.periodUserGroupValue = []; */
    }
    onOkPeriodDetail(event) {
        this.isVisiblePeriodDetail = false;
        this.viewperiodDetailData = undefined;
        this.periodTrainTypeValue = [];
        /* this.periodUserGroupValue = []; */
    }
    // 获取培训类型
    getTrainType(value) {
        if (value) {
            if (value.parent) {
                this.periodTrainTypeValue.push(value.name);
                for (let key in value) {
                    if (key == 'parent') {
                        this.getTrainType(value.parent);
                    }
                }

            } else {
                this.periodTrainTypeValue.push(value.name)
            }
        }

    }
    // 获取userG热破upgrt
    /* getUserValue(value) {
        if (value) {
            if (value.parent) {
                this.periodUserGroupValue.push(value.name);
                for (let key in value) {
                    if (key == 'parent') {
                        this.getUserValue(value.parent)
                    }
                }
            } else {
                this.periodUserGroupValue.push(value.name);
            }
        }

    } */
    // 培训形式
    getTrainForm(value) {
        if (value == 'FACE_TO_FACE') {
            return '面对面授课'
        } else if (value == 'ONLINE') {
            return '在线授课'
        } else if (value == 'BLEND') {
            return '混合授课'
        } else if (value == 'OTHER') {
            return '其他授课'
        } else {
            return undefined;
        }
    }
    getUserGroup(row) {
        if (row) {
            if (row.indexOf(',') !== -1 || row.indexOf('，') !== -1) {
                return row.replace(/\,|\，/g, '/')
            } else {
                return row;
            }
        } else {
            return '--'
        }
    }
    _startDateValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endDateValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledstartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledendDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };
    getNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/\,|\，/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }
}
