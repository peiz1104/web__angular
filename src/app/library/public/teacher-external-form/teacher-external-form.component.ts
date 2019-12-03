import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeacherPartService, TeachernewService } from './../../service/teachernew.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-external-form',
    templateUrl: './teacher-external-form.component.html',
    styleUrls: ['./teacher-external-form.component.scss']
})
export class TeacherExternalFormComponent implements OnInit {
    cardNumberType: string = 'IDCARD';
    @Input() teacher: any = {};
    @Input() isEdit?: boolean = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    IDNumberCheckStatus: boolean = false;
    validateForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private teachernewService: TeachernewService,
        private teacherPartService: TeacherPartService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.cardNumberType = this.teacher ? this.teacher.cardType ? this.teacher.cardType : 'IDCARD' : 'IDCARD';
        this.initForm(this.teacher);
    }

    initForm(m) {
        // let m = this.teacher || {};
        this.validateForm = this.fb.group({
            name: [m.name, [Validators.required]],
            sex: [m.sex || 'MALE'],
            birthday: m.birthday ? m.birthday : [moment(m.birthday).unix()],
            // tslint:disable-next-line:max-line-length
            phoneNumber: [m.phoneNumber, [Validators.required, Validators.pattern(/^1(3[0-9]|4[579]|5[012356789]|7[013678]|8[0-9]|9[0-9]|6[0-9])\d{8}$/)]],
            email: [m.email, [Validators.pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)]],
            cardType: [m.cardType || 'IDCARD', [Validators.required]], // 证件类型
            cardNumber: [m.cardNumber, [Validators.required, this.IDNumberControl]], // 证件号码
            postalCode: [m.postalCode], // 邮政编码
            position: [m.position], // 职位
            title: [m.title], // 职称
            rank: [m.rank || 'PREPARATORY', [Validators.required]], // 职级
            channel: [m.channel], // 渠道
            qualifications: [m.qualifications], // 讲师资格
            startDate: [moment(m.startDate).unix()], // 任教开始时间
            classHour: [m.classHour], // 课时数
            avgScore: [m.avgScore], // 平均得分
            schoolName: [m.schoolName], // 毕业学校
            graduationTime: [moment(m.graduationTime).unix()], // 毕业时间
            major: [m.major], // 所学专业
            education: [m.education || 'SPECIALTY'], // 学历
            degree: [m.degree || 'BANCHELOR'], // 学位
            address: [m.address], // 外部讲师通讯地址
            trainingDirection: [m.trainingDirection], //  外部讲师培训方向
            researchResult: [m.researchResult], //  外部讲师科研成果
            description: [m.description], // 描述
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    _save(event) {
        this.markAsDirty();
        if (this.validateForm.invalid) {
            return;
        }
        if (this.IDNumberCheckStatus) {
            return tipMessage('证件号填写有误！');
        }
        this.loading = true;
        // this.validateForm.value['userGroupId'] = this.newId;
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
    }

    back() {
        this.cancel.emit();
    }

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }
    vaildCardNumber(cardNumber) {
        let inputvalue = cardNumber.target.value.replace(/^\s*|\s*$/g, '');
        let id = this.isEdit ? this.teacher.id : null;
        let parms = {
            cardNumber: inputvalue,
        }
        if (id) {
            parms['id'] = id;
        }
        this.teacherPartService.vaildCardNumber(parms).subscribe(
            res => {
                if (res) {
                    if (res.cardNumber == 'true') {
                        this.validateForm.get('cardNumber').setValue('');
                        return tipMessage('证件号已存');
                    }
                }
            },
            err => {
                return tipMessage(err);
            }
        )
    }
    chooseCardType(value) {
        // console.log(value, 123);
        this.cardNumberType = value;
        this.IDNumberCheckStatus = false;
        this.validateForm.get('cardNumber').setValue('');
    }
    // 身份证号验证
    IDNumberControl = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        // 身份证和驾照验证
        if (this.cardNumberType == 'IDCARD' || this.cardNumberType == 'DRIVER') {
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
                        // tslint:disable-next-line:radix
                        if (area[parseInt(control.value.substr(0, 2))] == null) {
                            tipMessage(Errors[4], 'error', 5000);
                            this.IDNumberCheckStatus = true;
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
                                this.IDNumberCheckStatus = true;
                                return { confirm: true, error: true }; // 检测ID的校验位
                            } else {
                                this.IDNumberCheckStatus = false;
                            }
                        } else {
                            tipMessage(Errors[2], 'error', 5000);
                            this.IDNumberCheckStatus = true;
                            return { confirm: true, error: true }
                        }
                    } else if (control.value.length > 18) {
                        tipMessage(Errors[1], 'error', 5000);
                        this.IDNumberCheckStatus = true;
                        this.validateForm.get(`cardNumber`).setValue(null);
                        return { confirm: true, error: true }
                    } else if (control.value.length < 18) {
                        this.IDNumberCheckStatus = true;
                        return { confirm: true, error: true }
                    } else {
                        this.IDNumberCheckStatus = false;
                    }
                }
            }
        } else {
            if (controls) {
                if (control.value) {
                    let reg = /^[a-zA-Z0-9]{5,17}$/;
                    if (control.value.length >= 5 && control.value.length < 18) {
                        if (!reg.test(control.value)) {
                            tipMessage('护照填写不符合要求！', '', 3000);
                            this.IDNumberCheckStatus = true;
                            return { confirm: true, error: true }
                        } else {
                            this.IDNumberCheckStatus = false;
                        }
                    } else if (control.value.length < 5) {
                        this.IDNumberCheckStatus = true;
                        return { confirm: true, error: true }
                    } else {
                        tipMessage('护照填写有误！');
                        this.IDNumberCheckStatus = true;
                        return { confirm: true, error: true }
                    }
                }
            }
        }
    }
}
