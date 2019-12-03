/*
 * @Author: peimingjun
 * @Date: 2018-05-09 13:42:12
 * @Last Modified by: peimingjun
 * @Last Modified time: 2018-05-09 13:43:48
 */
import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../entity/user';
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormDataUtil } from '../../../core';
import { FormGroup } from '@angular/forms/src/model';
import * as moment from 'moment';
import { UserTypesService } from './../../service/user-types.service';
import { UserTypes } from './../../entity/user-types';
import { UserAttribute } from './../../entity/user-attribute';
import { UserGroup } from './../../entity/user-group';
import { isUndefined } from 'util';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-user-form-new',
    templateUrl: './user-form-new.component.html',
    styleUrls: ['./user-form-new.component.scss']
})
export class UserFormNewComponent implements OnInit, OnChanges {
    @Input() user: User;
    @Input() isCreate: boolean;
    @Input() orgdata: UserGroup;
    @Input() userGroupTo: UserGroup;
    @Input() btnstatego: boolean;
    @Input() goonfail: any;
    @Input() loading: boolean;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    confirmPassword: string = "";
    _date = moment('1970-01-01');
    _form: FormGroup;
    btnstate: boolean = false;
    uploadParams: any = {};
    relativePath: any;
    userTypess: UserTypes[];
    optiontype: any;
    brithDayStatus: boolean = true;
    optionsData = {
        601: [
            { value: 'LEAVE', label: '离职' },
            { value: 'INACTIVE', label: '不活动' },
            { value: 'RETIRE', label: '退休' },
            { value: 'ACTIVE', label: '激活' },
        ],
        703: [
            { value: 'SIGN', label: '签约' },
            { value: 'ASSESSMENTPROTECTION', label: '考核保护' },
            { value: 'SURRENDER', label: '解约' },
            { value: 'PREDISSOLUTION', label: '预解约' },
        ],
        1: [
            { value: 'ACTIVE', label: '激活' },
            { value: 'INVALID', label: '失效' },
        ]

    }
    constructor(private userTypesService: UserTypesService, private fb: FormBuilder) {

    }
    ngOnChanges() {
        if (this.goonfail == 'goonsuccess' && !this.btnstatego) {
            this._form.reset();
            let setvalue = this.orgdata ? this.orgdata : this.userGroupTo
            this._form.get('userGroup').setValue(setvalue);
            this._form.get('sex').setValue('MALE');
        }
    }
    ngOnInit() {
        let m = this.user || new User();
        let target = window.localStorage.getItem('target')
        if (this.isCreate) {
            this.userGroupTo = JSON.parse(target)
        }


        this.userTypesService.getAllUserTypes().subscribe(
            userTypess => {
                // console.log(this.user, 442)
                this.userTypess = userTypess;
            },
            err => {
                return tipMessage(err, 'error');
            }

        )
        if (m.userAttribute && m.userAttribute.userTypes && m.userAttribute.userTypes.id) {
            if (m.userAttribute.userTypes.id == 601) {
                this.optiontype = this.optionsData[601]
            } else if (m.userAttribute.userTypes.id == 703) {
                this.optiontype = this.optionsData[703]
            } else {
                this.optiontype = this.optionsData[1]
            }
        } else {
            this.optiontype = this.optionsData[1]
        }
        this.initForm();
    }

    initForm() {
        let m = this.user || new User();

        if (m.userAttribute == null) {

            // let userAttributex = new UserAttribute();
            // let userTypesx = new UserTypes();
            // let userGroupx = new UserGroup();
            // userAttributex.userTypes = userTypesx;
            // m.userAttribute =userAttributex;
            // m.userGroup = userGroupx;
            // this.user = new User();
            // this.user.userAttribute = userAttributex;
            // this.user.userGroup = userGroupx;
            // console.log(this.user,999999911);
        }
        // console.log(this.userTypesService.getAllUserTypes());

        this._form = this.fb.group({
            username: [m.username, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{2,20}$/)]],
            firstName: [m.firstName],
            lastName: [m.lastName],
            displayName: [m.displayName, [Validators.required]],
            // tslint:disable-next-line:max-line-length
            phoneNumber: [m.phoneNumber, [Validators.required, Validators.pattern(/^1(3[0-9]|4[579]|5[012356789]|7[013678]|8[0-9]|9[0-9]|6[0-9])\d{8}$/)]],
            email: [m.email, [Validators.pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)]],
            password: [''],
            sex: [m.sex || 'MALE'],
            userGroup: [m.userGroup.id ? m.userGroup : (this.orgdata ? this.orgdata : this.userGroupTo), [Validators.required]],
            startDate: [m.startDate ? moment(m.startDate) : null],
            endDate: [m.endDate ? moment(m.endDate) : null],
            language: [m.language || 'zh_CN'],
            // 添加的状态
            status: [m.status, [Validators.required]],
            iDCardNumber: [m.iDCardNumber || '', [Validators.required, this.IDNumberControl]],
            nationalMz: [m.userAttribute ? (m.userAttribute.nationalMz ? m.userAttribute.nationalMz : '汉族') : '汉族'], // 名族
            // tslint:disable-next-line:max-line-length
            politicalFeatures: [m.userAttribute ? (m.userAttribute.politicalFeatures ? m.userAttribute.politicalFeatures : '群众') : '群众'], // 政治面貌
            position: [m.userAttribute ? m.userAttribute.position : ''], // 岗位
            jobs: [m.userAttribute ? m.userAttribute.jobs : ''], // 职级
            cupluralityTitle: [m.userAttribute ? m.userAttribute.cupluralityTitle : ''], // 最高学历学校
            graduatedSchool: [m.userAttribute ? m.userAttribute.graduatedSchool : ''], // 毕业学校
            firstSpecialty: [m.userAttribute ? m.userAttribute.firstSpecialty : ''], // 所学第一专业
            secondSpecialty: [m.userAttribute ? m.userAttribute.secondSpecialty : ''], // 所学第二专业
            cupluralityoNumber: [m.userAttribute ? m.userAttribute.cupluralityoNumber : ''], // 从事寿险行业工作年限
            birthday: [m.userAttribute ? (m.userAttribute.birthday ? moment(m.userAttribute.birthday) : null) : null], // 出生年月
            cupluralityPname: [m.userAttribute ? m.userAttribute.cupluralityPname : ''], // 从事培训工作年限
            officePhoneNumber: [m.userAttribute ? m.userAttribute.officePhoneNumber : ''], // 办公年限
            userTypesId: [m.userAttribute && m.userAttribute.userTypes ? m.userAttribute.userTypes.id : '', [Validators.required]],
            // id:[m.id],
            userAttributeId: [m.userAttribute ? m.userAttribute.id : ''],
            education: [m.userAttribute ? m.userAttribute.education : '']

        });
    }

    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }

    _save(event, value, type) {
        this.markAsDirty();
        if (this._form.invalid) {
            return;
        }
        let flag = isUndefined(this.user);
        if (flag) {
            this.user = new User();
            // console.log("333");
        }
        let userGroupNew = new UserGroup();
        userGroupNew = value.userGroup;
        this.user.userGroup = userGroupNew;

        let userTypesNew = new UserTypes();
        userTypesNew.id = <number>value.userTypesId;

        let userAttributeNew = new UserAttribute();
        userAttributeNew.id = <number>value.userAttributeId;
        userAttributeNew.userTypes = userTypesNew;
        userAttributeNew.birthday = value.birthday;
        userAttributeNew.cupluralityoNumber = value.cupluralityoNumber;
        userAttributeNew.cupluralityPname = value.cupluralityPname;
        userAttributeNew.cupluralityTitle = value.cupluralityTitle;
        userAttributeNew.firstSpecialty = value.firstSpecialty;
        userAttributeNew.graduatedSchool = value.graduatedSchool;
        userAttributeNew.jobs = value.jobs;
        userAttributeNew.nationalMz = value.nationalMz;
        userAttributeNew.officePhoneNumber = value.officePhoneNumber;
        userAttributeNew.politicalFeatures = value.politicalFeatures;
        userAttributeNew.position = value.position;
        userAttributeNew.secondSpecialty = value.secondSpecialty;

        this.user.userAttribute = userAttributeNew;
        this.user.displayName = value.displayName;
        this.user.username = value.username;
        this.user.sex = value.sex;
        this.user.phoneNumber = value.phoneNumber;
        this.user.email = value.email;
        this.user.startDate = value.startDate;
        this.user.endDate = value.endDate;
        this.user.language = value.language;
        this.user.iDCardNumber = value.iDCardNumber;
        this.user.status = value.status;
        // console.log(this.user, userGroupNew.id, 44)
        if (type == 'goon') {
            if (this.loading) {
                tipMessage('正在提交不可重复提交', '', 2000)
                return;
            }
            this.btnstatego = true;
            this.save.emit({ originalEvent: event, value: this.user, type: type });
        } else if (type == 's2') {
            if (this.btnstatego) {
                tipMessage('正在提交不可重复提交', '', 2000)
                return;
            }
            this.loading = true;
            this.save.emit({ originalEvent: event, value: this.user, type: type });
        }

    }
    // 检测输入的身份证号


    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }
    changeofficenumber(event) {
        let value = event.target.value;
        if (/^(\d{2,4}-?)?\d{7,8}$/.test(value)) {

        } else {
            event.target.value = '';
            return tipMessage('请输入正确的座机号！', 'error');
        }
    }
    // 拿到文件
    getfile = (event) => {
        // console.log(event, 222)
        this.uploadParams = event;
        this.relativePath = event.fullPath;

    }
    // 所属组织
    logSelectGroup(value) {
        // console.log(value, 222)
    }
    changeDate($event) {
        // console.log($event, 2222)

    }
    // usertype
    chooseuserTye(value) {
        // console.log(value)

        if (value == 601) {
            this.optiontype = this.optionsData[601]
        } else if (value == 703) {
            this.optiontype = this.optionsData[703]
        } else {
            this.optiontype = this.optionsData[1]
        }
        this._form.get('status').setValue(this.optiontype[0].value)
        // this.statusvalue=this.optiontype[0].label;
    }


    updateBithday(idcar) {  // 输入身份证号性别和生日自动生成
        let inputvalue = idcar.target.value.replace(/^\s*|\s*$/g, '');
        // tslint:disable-next-line:max-line-length
        if (/^(^1[1-5]|^2[1-3]|^3[1-7]|^4[1-6]|^5[0-4]|^6[1-5]|71|81|82|91)\d{4}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(inputvalue) && this.brithDayStatus) {
            let m, sex;
            m = this.getbridth(inputvalue);
            sex = this.getSex(inputvalue);
            this._form.get('birthday').setValue(moment(m));
            this._form.get('sex').setValue(sex);
        } else {
            // this._form.get(`iDCardNumber`).setValue(null);
            this._form.get('birthday').setValue(null);
            return tipMessage('身份证验证失败', 'error');
        }

    }
    getbridth(idCard) {
        let birthday = "";
        if (idCard != null && idCard != "") {
            if (idCard.length == 15) {
                birthday = "19" + idCard.substr(6, 6);
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }

        return birthday;
    }
    getSex(iIdNo) {
        let sexStr = 'MALE'
        if (iIdNo.length == 15) {
            sexStr = parseInt(iIdNo.substring(14, 1), 10) % 2 ? "MALE" : "FAMALE";
        } else {
            sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? "MALE" : "FAMALE";

        }
        return sexStr;
    }


    IDNumberControl = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._form && this._form.controls;

        if (controls) {
            if (control.value) {
                let Errors = new Array("1", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
                let area = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外"
                }
                let retflag = false;
                let Y, JYM;
                let S, M, ereg;
                let idcard_array = new Array();
                idcard_array = control.value.split("");
                if (control.value.length == 18) {
                    this.brithDayStatus = true;
                    // tslint:disable-next-line:radix
                    if (area[parseInt(control.value.substr(0, 2))] == null) {
                        tipMessage(Errors[4], 'error', 5000);
                        this.brithDayStatus = false;
                        return { confirm: true, error: true };
                    }
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:radix
                    if (parseInt(control.value.substr(6, 4)) % 4 == 0 || (parseInt(control.value.substr(6, 4)) % 100 == 0 && parseInt(control.value.substr(6, 4)) % 4 == 0)) {
                        // tslint:disable-next-line:max-line-length
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式 
                    } else {
                        // tslint:disable-next-line:max-line-length
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式 
                    }
                    if (ereg.test(control.value)) {
                        // 计算校验位
                        // tslint:disable-next-line:max-line-length
                        // tslint:disable-next-line:radix
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";
                        M = JYM.substr(Y, 1); // 判断校验位
                        console.log(M, idcard_array[17], 2244);
                        if (M != idcard_array[17]) {
                            tipMessage(Errors[3], 'error', 5000);
                            this.brithDayStatus = false;
                            return { confirm: true, error: true }; // 检测ID的校验位
                        }
                    } else {
                        tipMessage(Errors[2], 'error', 5000);
                        this.brithDayStatus = false;
                        return { confirm: true, error: true }
                    }
                } else if (control.value.length > 18) {
                    this.brithDayStatus = false;
                    tipMessage(Errors[1], 'error', 5000);
                    this._form.get(`iDCardNumber`).setValue(null);
                    return { confirm: true, error: true }
                }
            }
        }
    }


}
