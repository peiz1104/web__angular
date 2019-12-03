import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Course } from './../../entity/course';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CourseService } from 'app/learning/course/service/course.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { connect } from 'net';
import { validateConfig } from '@angular/router/src/config';
import { AuthService } from 'app/core';
import * as _ from 'lodash';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

    @Input() course: Course;
    // @Input() isCreate: boolean = false;
    @Input() actionsViewRef: TemplateRef<any>;

    @Output() doSubmit: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() loading: boolean;

    @Input() editableFields: string[];
    @Input() excludeFields: string[];
    @Input() trainingType: string;
    showCascaderSpan: boolean = true;
    categoryType: boolean = false;
    userGroupType: boolean = false;
    list = [];
    _form: FormGroup;
    courseIds: any = [];
    spinning: boolean = false;
    _options: any;
    newArr: any = [];
    _value: any = [];
    coursecategory: boolean = true;
    _browsers = [         // 浏览器选项
        { label: 'IE9-11', value: 'IE9-11', checked: false },
        { label: 'Edge', value: 'Edge', checked: false },
        { label: '360', value: '360', checked: false },
        { label: '火狐', value: 'FireFox', checked: false },
        { label: '谷歌', value: 'Chrome', checked: false },
    ];
    _courseTypes = [

    ];
    protected allChecked = false;     // 全选图标样式
    protected indeterminate = false;  // 部分选定图标样式

    public get valid() {
        return !!this._form && this._form.valid;
    }

    public get invalid() {
        return !this._form || this._form.invalid;
    }

    get isCreate() {
        if (this.course) {
            return !this.course.id;
        }
    }

    constructor(
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private message: NzMessageService,
        private authService: AuthService
    ) { }


    ngOnInit() {
        this._courseTypes = [
            // tslint:disable-next-line:max-line-length
            { value: 'ONLINE', label: '在线学习', disabled: this.trainingType && (this.trainingType !== 'ONLINE' && this.trainingType != 'MIXED') },
            { value: 'LIVE', label: '直播课堂', disabled: this.trainingType && (this.trainingType !== 'LIVE' && this.trainingType != 'MIXED') },
            // tslint:disable-next-line:max-line-length
            { value: 'OFFLINE', label: '面授培训', disabled: this.trainingType && (this.trainingType !== 'OFFLINE' && this.trainingType != 'MIXED') },
        ]
        this._initForm();
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user) {
                    if (user.site) {
                        if (user.site.id == 30) {
                            this.getCourseData();
                            /* this.getcoursecategory();*/
                        } else {
                            this.coursecategory = false;
                        }
                    }
                }
            }
        )

    }
    // panduan是培训班课程copy的课程
    judgeTrainclassCopy(value) {
        if (value.sourceType != 'ORIGINAL') {
            // 不可以编辑除学分
            for (let name of Object.keys(this._form.controls)) {
                if (!this.canEditableField(name)) {
                    this._form.get(name).disable();
                }
            }
        } else {
            this.notrainingclass(this.course);
        }
    }
    canEditableField(name) {
        let caneditfiled = ['point', 'imageUrl', 'value'];
        return caneditfiled.some((item) => {
            return name == item;
        })
    }
    // 非培训班判断表单
    notrainingclass(course) {
        if (course.id) {
            this._form.get('code').disable();
            this.editableFields = ['imageUrl', 'point', 'category', 'userGroup', 'value'];
        } else {
            this.editableFields = ['imageUrl', 'point', 'category', 'userGroup', 'value'];
        }
        if (this.course.sourceType == 'REFERENCED') {
            for (let name of Object.keys(this._form.controls)) {
                if (!this.isEditableField(name)) {
                    this._form.get(name).disable();
                }
            }
        }
    }

    // 获取课程大类小类数据
    getcoursecategory() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id || params.courseId) {
                let id = params.id || params.courseId
                this.courseService.getsavecategoryType(id).subscribe(
                    (data) => {
                        // console.log(data)
                        const optionData = data.category;
                        if ((params.id || params.courseId) && optionData && Object.keys(optionData).length) {
                            if (optionData.firstCourseType && optionData.secondCourseType && optionData.thirdCourseType) {
                                let value = [{
                                    value: optionData.firstCourseType ? optionData.firstCourseType.typeId : null,
                                    label: optionData.firstCourseType ? optionData.firstCourseType.typeName : null
                                }, {
                                    value: optionData.secondCourseType ? optionData.secondCourseType.typeId : null,
                                    label: optionData.secondCourseType ? optionData.secondCourseType.typeName : null
                                }, {
                                    value: optionData.thirdCourseType ? optionData.thirdCourseType.typeId : null,
                                    label: optionData.thirdCourseType ? optionData.thirdCourseType.typeName : null
                                }]
                                this._value = value;
                            } else {
                                this._value = [];
                            }
                            this._form.get('value').setValue(this._value);
                            if (this._value.length > 0) {
                                // this._form.get('value').disable();
                            }
                            // tslint:disable-next-line:max-line-length
                            this.courseIds = [optionData.firstCourseType ? optionData.firstCourseType.typeId : null, optionData.secondCourseType ? optionData.secondCourseType.typeId : null, optionData.thirdCourseType ? optionData.thirdCourseType.typeId : null]
                        }

                    }
                )
            }
        });
    }


    // 获取课程大类小类数据
    getcoursecategorynew() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id || params.courseId) {
                let id = params.id || params.courseId
                this.courseService.getsavecategoryTypenew(id).subscribe(
                    (data) => {
                        // console.log(data)
                        const optionData = data.category;
                        if ((params.id || params.courseId) && optionData && Object.keys(optionData).length) {
                            if (optionData.firstCourseType && optionData.secondCourseType && optionData.thirdCourseType) {
                                let value = [{
                                    value: optionData.firstCourseType ? optionData.firstCourseType.typeId : null,
                                    label: optionData.firstCourseType ? optionData.firstCourseType.typeName : null
                                }, {
                                    value: optionData.secondCourseType ? optionData.secondCourseType.typeId : null,
                                    label: optionData.secondCourseType ? optionData.secondCourseType.typeName : null
                                }, {
                                    value: optionData.thirdCourseType ? optionData.thirdCourseType.typeId : null,
                                    label: optionData.thirdCourseType ? optionData.thirdCourseType.typeName : null
                                }]

                                this._value = value;
                            } else {
                                this._value = [];
                            }
                            this._form.get('value').setValue(this._value);
                            console.log(this._value.length)
                            if (this._value.length) {
                                this.showCascaderSpan = true;
                            } else {
                                this.showCascaderSpan = false;
                            }
                            //   this._initForm();
                            if (this._value.length > 0) {
                                // this._form.get('value').disable();
                            }
                            // tslint:disable-next-line:max-line-length
                            this.courseIds = [optionData.firstCourseType ? optionData.firstCourseType.typeId : null, optionData.secondCourseType ? optionData.secondCourseType.typeId : null, optionData.thirdCourseType ? optionData.thirdCourseType.typeId : null]

                        }

                    }
                )
            }
        });
    }
    getCourseData = () => {
        this.courseService.getCourseData().subscribe(
            (data) => {
                let arrData = data.categoryList;
                for (var i = 0; i < arrData.length; i++) {
                    this.newArr.push({
                        value: arrData[i].typeId,
                        label: arrData[i].typeName
                    })
                    if (arrData[i].bigList && arrData[i].bigList.length) {
                        this.newArr[i]["children"] = [];
                        for (var j = 0; j < arrData[i].bigList.length; j++) {
                            this.newArr[i]['children'].push({
                                value: arrData[i].bigList[j].typeId,
                                label: arrData[i].bigList[j].typeName
                            })
                            if (arrData[i].bigList[j].smallList && arrData[i].bigList[j].smallList.length) {
                                this.newArr[i].children[j]["children"] = [];
                                for (let z = 0; z < arrData[i].bigList[j].smallList.length; z++) {
                                    this.newArr[i].children[j].children.push({
                                        value: arrData[i].bigList[j].smallList[z].typeId,
                                        label: arrData[i].bigList[j].smallList[z].typeName,
                                        isLeaf: true
                                    })
                                }
                            }
                        }
                    }
                }
                this._options = this.newArr;
                this.getcoursecategorynew();
            }, err => {

            }
        );
    }


    _console(value) {
        this.courseIds = value;
        if (value.length) {
            this.showCascaderSpan = true;
        } else {
            this.showCascaderSpan = false;
        }
        console.log(value, 'changes');
        console.log(this.courseIds);
    }
    cascaderCancel() {
        this.showCascaderSpan = false;
        this.courseIds = [];
        this.getFormControl('value').setValue([])
    }
    _clearn(event) {
        console.log(event, 66666)
    }
    _initForm() {
        let m = this.course || new Course();
        // console.log(this.course, 444);
        this._form = this.fb.group({
            value: [this._value],
            id: [m.id],
            code: [m.code, Validators.required],
            name: [m.name, Validators.required],
            imageUrl: [m.imageUrl],
            category: [m.category],
            userGroup: [m.userGroup],
            courseType: [{ value: m.courseType, disabled: !this.isCreate }, Validators.required],
            duration: [m.duration, [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
            period: [m.period, [Validators.pattern(/^[0-9]+([.]{1}[0-9]{1})?$/)]],
            version: [m.version],
            point: [m.point],
            platform: [m.platform || 'ALL'],
            browsers: [m.browsers],
            keyWords: [m.keyWords],
            description: [m.description],
            authorization: [m.authorization || 'N'],
            turnAuthorization: [m.turnAuthorization || 'N']
        });

        if (!m.code) {
            this.spinning = true;
            this.courseService.getCourseCode(m).subscribe(
                ({ code }) => {
                    if (code) {
                        this._form.patchValue({ 'code': code });
                        this.spinning = false;
                    }
                }, err => {
                    // err info
                    this.spinning = false;
                }
            );
        }

        this._browsers.forEach(it => {
            // includes
            if (m.browsers && m.browsers.indexOf(it.value) != -1) {
                it.checked = true;
            } else {
                it.checked = false;
            }
            // it.checked = !!m.browsers && m.browsers.includes(it.value);
        });

        this._form.addControl('_browsers', new FormControl(this._browsers));

        let keywords = m.keyWords ? m.keyWords.split(',') : [];
        this._form.addControl('_keywords', new FormControl(keywords));
        this.activatedRoute.data.subscribe((course) => {
            if (course.trainingClass && this.course.id) {
                if (course.trainingClass.type == 'TRAINING_CLASS') {
                    this.judgeTrainclassCopy(this.course);
                }
            } else {
                this.notrainingclass(this.course);
            }
        })


    }

    isEditableField(name) {
        if (this.editableFields) {
            return this.editableFields.some(it => it == name);
        } else {
            return true;
        }
    }

    isExcludeField(name) {
        if (this.excludeFields) {
            return this.excludeFields.some(it => it = name);
        }
    }

    getFormControl(name) {
        return this._form.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }


    onSubmit(event: Event, nextAction?: string) {
        this.markAsDirty();
        if (this._form.invalid) {
            return tipMessage('表单校验失败！', '', 2000);
        }
        let isSubmit = this.validateForm();
        if (isSubmit) {
            let params = {
                ...this._form.value,
            };
            // this.courseIds = params.value;
            console.log(params, 442);
            if (!this.coursecategory) {
                delete params.value;
            }
            console.log(this.courseIds);
            this.doSubmit.emit({ originalEvent: event, value: params, nextAction: nextAction, courseIds: this.courseIds });
        }
    }

    validateForm() {
        this.categoryType = this.getFormControl('category').value ? (this.getFormControl('category').value.id ? false : true) : true;
        this.userGroupType = this.getFormControl('userGroup').value ? (this.getFormControl('userGroup').value.id ? false : true) : true;
        if (this.categoryType || this.userGroupType) {
            return false;
        }
        return true;
    }

    logSelectCategory(event) {
        this.categoryType = event ? false : true;
    }
    logSelectGroup(event) {
        this.userGroupType = event ? false : true;
    }

    doCancel(event) {
        this.cancel.emit({ originalEvent: event });
    }

    updateAllChecked(isChecked) {
        this.indeterminate = false;
        this._browsers.forEach(item => item.checked = isChecked);

        this.updateBrowserChecked();
    }

    updateSingleChecked(e) {
        if (this._browsers.every(item => item.checked === false)) {
            this.allChecked = false;
            this.indeterminate = false;
        } else if (this._browsers.every(item => item.checked === true)) {
            this.allChecked = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }

        this.updateBrowserChecked();
    }

    updateBrowserChecked() {
        this.getFormControl('browsers').setValue(
            this._browsers.filter(it => it.checked === true).map(it => it.value)
        );
    }

    keywordsChange(value) {
        // console.log(value)
        if (!!value) {
            this.getFormControl('keyWords').setValue(Array.isArray(value) ? value.join(',') : value);
        } else {
            this.getFormControl('keyWords').setValue(undefined);
        }
    }
}
