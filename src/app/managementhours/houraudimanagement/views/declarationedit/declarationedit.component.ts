import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import * as moment from 'moment';
import { error } from 'util';
declare let $: any;
import { tipMessage } from 'app/account/entity/message-tip';
// 培训方式数据

@Component({
    selector: 'spk-declarationedit',
    templateUrl: './declarationedit.component.html',
    styleUrls: ['./declarationedit.component.scss']
})

export class DeclarationeditComponent implements OnInit {
    hourId: any = undefined;
    spinning: boolean = false;
    _form: FormGroup;
    btnstate: boolean = false;
    // _options: any = options; // 培训方式数据
    isFreeCost: boolean = false; // 判断是否收费
    trainFormDes: boolean = false; // 培训形式描述，当培训形式为其他时显示
    uploadfilename: any = undefined; // 上传文件的名字
    files: any = []; // 上传文件流编辑和添加都可以进行添加
    resfiles: any = []; // 编辑现有的文件的数据
    remarkArray: any = [];
    traintypeRootData: any; // 培训类型根节点数据
    traintypeAllData: any[] = []; // 培训类型所有数据
    _valueTrainType: any[] = null; // 培训类型
    _valueTrainWay: any[] = null;
    _valueTrainTheme: any[] = null;
    _valueTrainSource: any[] = null;
    valueTrainThemeData = [];
    valueTrainWayData = [];
    valueTrainSourceData = [];
    valueTrainTypeData = [];
    trainwayAllData: any[] = []; // 培训方式
    trainthemeAllData: any[] = []; // 培训主题
    trainsourceAllData: any[] = []; // 培训来源
    trainthemeRootData: any;
    trainwayRootData: any;
    trainsourceRootData: any;
    _startDate = null;
    _endDate = null;
    carryoverYear: any;
    initFormData: any = {
        trainName: ['', [Validators.required]], // 培训名称
        trainPlace: ['', [Validators.required]], // 培训地点
        periodNumber: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]], // 培训学时
        /* trainPeople: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],  */// 培训人数
        trainContent: ['', [Validators.required, Validators.maxLength(100)]], // 培训内容
        trainDays: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]], // 培训天数
        "periodTrainingWey": [null], // 培训方式
        otherTypeDescription: [''], // 当培训形式为其他时显示培训形式描述
        trainForm: [undefined], // 培训形式
        "periodTrainingTheme": [null, [Validators.required]], // 培训主题
        "periodTrainingSource": [null], // 培训来源
        "periodTrainingType": [null], // 培训类型
        "userGroupName": [''], // 主办单位
        remark: ['', [Validators.maxLength(500)]], // 描述
        userIds: [null, [Validators.required]], // 学员
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required]],
        isInvolveCost: [undefined], // 收费情况
        cost: [''], // 费用只有在收费的情况下出现
    };

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private hourservice: HourService,
        private fb: FormBuilder
    ) { }
    initForm() {
        this._form = this.fb.group(this.initFormData)
    }
    ngOnInit() {
        this.initForm()
        this.routeInfo.queryParams.subscribe((params) => {
            this.hourId = params.id;
        })
        this.routeInfo.data.subscribe(
            data => {
                // console.log(data, 2334)
                this.carryoverYear = data.carryoverDetail ? data.carryoverDetail.year : undefined;
            }
        )
        // 获取培训级别
        this.hourservice.gettraintypeall().subscribe(
            res => {
                // console.log(res);
                this.traintypeAllData = res.array;
                let rootdata = this.getTraintypeData(res.array);
                this.traintypeRootData = this.transTraintypeData(rootdata);
                // console.log(this.traintypeRootData, 345);
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
                this.trainwayAllData = res.array
                let rootdata = this.getTraintypeData(res.array);
                this.trainwayRootData = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        // peixun主题
        this.hourservice.gettraintheme().subscribe(
            res => {
                this.trainthemeAllData = res.array;
                let rootdata = this.getTraintypeData(res.array);
                this.trainthemeRootData = this.transTraintypeData(rootdata);
            }
        )
        // 培训来源
        this.hourservice.gettrainsource().subscribe(
            res => {
                this.trainsourceAllData = res.array;
                let rootdata = this.getTraintypeData(res.array);
                this.trainsourceRootData = this.transTraintypeData(rootdata);
            },
            err => {
                return tipMessage(err);
            }
        )
        if (this.hourId) {
            this.spinning = true;
            // 请求对应ID下的学时
            this.hourservice.getperioddeclarmessage(this.hourId).subscribe(
                (res) => {
                    // console.log(res)
                    // 将数据映射到表单上
                    // isInvolveCost如果为true时，input的cost显示，trainForm为OTHER时显示描述内容otherTypeDescription
                    if (res.trainForm && res.trainForm == 'OTHER') {
                        this.trainFormDes = true;
                    }
                    if (res.isInvolveCost) {
                        this.isFreeCost = true;
                    }
                    this._endDate = res.endDate ? new Date(res.endDate) : null;
                    this._startDate = res.startDate ? new Date(res.startDate) : null;
                    // tslint:disable-next-line:forin
                    for (let key in this.initFormData) {
                        this.initFormData[key] = [res[key], this.initFormData[key][1]];
                        this.initForm();
                    }
                    this.getcascaderValue(res.periodTrainingSource, this.valueTrainSourceData);
                    this.getcascaderValue(res.periodTrainingTheme, this.valueTrainThemeData);
                    this.getcascaderValue(res.periodTrainingWey, this.valueTrainWayData);
                    this.getcascaderValue(res.periodTrainingType, this.valueTrainTypeData);
                    this._valueTrainSource = this.valueTrainSourceData;
                    this._valueTrainTheme = this.valueTrainThemeData;
                    this._valueTrainWay = this.valueTrainWayData;
                    this._valueTrainType = this.valueTrainTypeData;
                    this.resfiles = res.attachs ? res.attachs : [];
                    this.files = res.attachs ? res.attachs : [];
                    // tslint:disable-next-line:forin
                    for (let key in this.initFormData) {
                        if (key == 'isInvolveCost') {
                            this._form.get('isInvolveCost').setValue(res[key] ? 1 : 0)
                            // this.initFormData[key] = [res[key] ? 1 : 0, this.initFormData[key][1]]
                        }
                        if (key == 'userIds') {
                            if (res.user) {
                                this._form.get('userIds').setValue([res['user']]);
                            } else {
                                this._form.get('userIds').setValue(null);
                            }
                            // this.initFormData[key] = [[res['user']], this.initFormData[key][1]]
                        }
                        if (key == 'startDate' || key == 'endDate') {
                            this.initFormData[key] = [moment(res[key]), this.initFormData[key][1]];
                        }
                    }
                    this.spinning = false;
                },
                err => {
                    this.spinning = false;
                    return tipMessage(err);
                }
            )
        }
    }
    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }
    // 返回列表
    goBack() {
        window.history.back();
    }
    // 培训方式
    selectTrainingWey(value) {
        // console.log(value, 44)
    }
    // 培训主题
    selectTrainingTheme(value) {
        console.log(value, 'theme');
    }

    // 培训来源
    selectTrainingSource(value) {
        console.log(value, 'source')
    }

    // 培训类型
    selectTrainingType(value) {
        console.log(value, 'type')
    }

    // 选择收费方式
    _consoleisInvolveCost(event) {
        if (event == 1) {
            this.isFreeCost = true;
        } else {
            this.isFreeCost = false
        }
        console.log(event, '收费方式')
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
        let file = document.getElementById("fileId");
        if (file.outerHTML) {
            file.outerHTML = file.outerHTML;
        } else { // FF(包括3.5)
            file['value'] = "";
        }
        this.files = '';
        this.uploadfilename = undefined;
        tipMessage('删除成功', 'success');
    }
    // 表单保存提交
    _saveformmessage($event, value) {
        // console.log(value, 222)
        $event.preventDefault();
        let trainTypeId, trainSourceId, trainThemeId, trainWeyId;
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
        if (value['periodTrainingSource']) {
            if (Object.prototype.toString.call(value['periodTrainingSource'][0]) == '[object Object]') {
                let index = value['periodTrainingSource'].length - 1;
                trainSourceId = value['periodTrainingSource'][index].value
            } else {
                let index = value['periodTrainingSource'].length - 1;
                trainSourceId = value['periodTrainingSource'][index]
            }
        }
        if (value['periodTrainingTheme']) {
            if (Object.prototype.toString.call(value['periodTrainingTheme'][0]) == '[object Object]') {
                let index = value['periodTrainingTheme'].length - 1;
                trainThemeId = value['periodTrainingTheme'][index].value
            } else {
                let index = value['periodTrainingTheme'].length - 1;
                trainThemeId = value['periodTrainingTheme'][index]
            }
        }
        if (value['periodTrainingWey']) {
            if (Object.prototype.toString.call(value['periodTrainingWey'][0]) == '[object Object]') {
                let index = value['periodTrainingWey'].length - 1;
                trainWeyId = value['periodTrainingWey'][index].value
            } else {
                let index = value['periodTrainingWey'].length - 1;
                trainWeyId = value['periodTrainingWey'][index]
            }
        }
        let params = {
            ...value,
            attachs: this.files,
            "periodTrainingTheme": { id: value['periodTrainingTheme'] ? trainThemeId : null },
            "periodTrainingSource": { id: value['periodTrainingSource'] ? trainSourceId : null },
            "periodTrainingType": { id: value['periodTrainingType'] ? trainTypeId : null },
            "periodTrainingWey": { id: value['periodTrainingWey'] ? trainWeyId : null },
            /* "userGroup": value['userGroup'] ? { id: value['userGroup'].id } : null, */
            userIds: value.userIds ? this.getobjId(value.userIds) : [],
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD')
        }

        // console.log(params, 3323)
        if (!params.periodTrainingSource.id) {
            delete params.periodTrainingSource
        }
        if (!params.periodTrainingType.id) {
            delete params.periodTrainingType
        }
        if (!params.periodTrainingWey.id) {
            delete params.periodTrainingWey
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
        if (this.carryoverYear) {
            if (new Date(params.endDate).getFullYear() <= this.carryoverYear) {
                return tipMessage(`结束时间不能小于最近结转年份${this.carryoverYear}年`, 'error', 5000);
            }
        }
        if (this.hourId) {
            // 编辑操作
            let objparams = {
                ...params,
                id: this.hourId,
                isDeleted: false
            }

            if (this._form.invalid) {
                this.btnstate = false;
                return tipMessage('表单校验失败！');
            } else {
                this.btnstate = true;
                this.hourservice.editdeclarehour(objparams).subscribe(
                    res => {
                        this.btnstate = false;
                        tipMessage('添加成功！', 'success');
                        this.route.navigate(['/classhour/houraduitmanage/hourauditdeclarelist'])
                    },
                    err => {
                        this.btnstate = false;
                        return tipMessage(err);
                    }
                )
            }

        } else {
            if (this._form.invalid) {
                return tipMessage('表单校验失败!');

            } else {
                this.btnstate = true;
                this.hourservice.adddeclarehour(params).subscribe(
                    (res) => {
                        this.btnstate = false;
                        tipMessage('添加成功！', 'success')
                        this.route.navigate(['/classhour/houraduitmanage/hourauditdeclarelist'])
                    },
                    err => {
                        this.btnstate = false;
                        return tipMessage(err);
                    }
                )
            }

        }

    }
    // 培训类型的三级联动
    _console(value) {
        // console.log(value, '培训类型的三级联动');
    }
    // 加载培训类型
    loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
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
    loadTrainWeyData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainwayRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainwayAllData, e.option.value);
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
    loadTrainSourceData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        // root根节点
        if (e.index === -1) {
            e.resolve(this.trainsourceRootData);
            return;
        }
        if (e.option) {
            // 如果有子集的话去加载子集
            e.option.loading = true;
            let allchildrenData = this.findchildrenData(this.trainsourceAllData, e.option.value);
            let childrenData = this.transTraintypeData(allchildrenData);
            setTimeout(() => {
                e.resolve(childrenData);
                e.option.loading = false;
            }, 500)
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
    findchildrenData(arrayAllData, id) {
        return arrayAllData.filter((item, index) => {
            if (item.parent) {
                return item.parent.id == id;
            }
        })
    }
    // 将得到的某个节点的所有节点显示所需格式
    getneedEdit(array: any[]) {
        let data = [];
        array.map((item, id) => {
            data.push({
                value: item[0],
                label: item[1]
            })
        })
        return data;
    }
    // 三级节点显示
    getcascaderValue(obj, array) {
        if (obj) {
            array.unshift({
                value: obj.id,
                label: obj.name
            })
            if (obj.parent) {
                this.getcascaderValue(obj.parent, array)
            }
        } else {
            array = [];
        }
    }
    // 编辑时获取对应的培训类型id
    getTraintypeId(array: any[]) {
        let trainTypeId = [];
        array.map((item, index) => {
            trainTypeId.push(item[0])
        })
        return trainTypeId;
    }
    // 三级联动讲对象转化为数组
    gettrainId(arrayvalue: any[]) {
        let trainId = [];
        arrayvalue.map((item, index) => {
            trainId.push(item.value)
        })
        return trainId;
    }
    // 获取对象中的id
    getobjId(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 截取数组的最后一项
    arrayslice(array) {
        if (array) {
            if (array.length > 1) {
                return array.slice(array.length - 1);

            } else {
                return array
            }
        } else {
            return array
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
}
