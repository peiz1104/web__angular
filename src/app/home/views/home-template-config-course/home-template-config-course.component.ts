import { Course } from './../../entity/course';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { UserGroup } from '../../../system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-config-course',
    templateUrl: './home-template-config-course.component.html',
    styleUrls: ['./home-template-config-course.component.scss']
})
export class HomeTemplateConfigCourseComponent implements OnInit, OnChanges {
    @Input() id?: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    validateForm: FormGroup;
    moduleInfo: any;
    courseInfo: any;
    courseStyle: string = 'tbl_1';
    courseTotal: number = 5;
    styleInfo: any;
    curCourse: number = 0; // 选中的课程
    curCourseInfo: any;  // 选中课程的内容
    templateId: number; // 模板id
    isNew: boolean;   // 是否选择图片
    saveLoading: boolean = false;

    searchtext: string;

    switchValue = false; // 是否从策略选择
    selectedOption;

    isShow: boolean = false;  // 是否显示所有课程
    courseList: any;   // 所有的课程列表
    columns;
    loading: boolean = false;
    selection;

    courseName: string;
    searcher: any;
    userGroup: UserGroup = new UserGroup();

    constructor(
        private fb: FormBuilder,
        private templateService: HomeTemplateApiService,
        private route: ActivatedRoute,
        private confirmServ: NzModalService,
    ) { }

    ngOnInit() {
        console.log(this.id)
    }
    ngOnChanges() {
        this.route.params.subscribe(
            (params: Params) => {
                this.templateId = params['id'] as number;
            }
        );
        // 获取样式详情
        this.templateService.getCourseStyle().subscribe(data => {
            this.styleInfo = data;
            this.styleInfo.forEach((item, i) => {
                item.img = `./assets/images/course_style${i + 1}.png`;
                item.infoList = [];
                for (let j = 0; j < item.positionNum; j++) {
                    item.infoList.push({ positionTable: j })
                }
            });
            this.validateForm.get('layoutModuleTemplate').setValue({ id: this.styleInfo[0].id })
        })
        if (this.id) {
            this.templateService.configInfoAll.forEach(e => {
                if (e.id == this.id) {
                    this.moduleInfo = { ...e };
                    this.courseInfo = [...e.itemInfo];
                }
            });
            if (this.moduleInfo.isStrategy) {
                this.courseInfo.forEach((item, i) => {
                    item.positionTable = i;
                });
            }
            this.curCourseInfo = this.courseInfo[0];
            this.courseStyle = this.moduleInfo.layoutModuleTemplateName || 'tbl_1';
            if (this.courseStyle == 'tbl_1') {
                this.courseTotal = 5;
            } else if (this.courseStyle == 'tbl_2') {
                this.courseTotal = 10;
            } else if (this.courseStyle == 'tbl_3') {
                this.courseTotal = 8;
            } else if (this.courseStyle == 'tbl_4') {
                this.courseTotal = 7;
            } else if (this.courseStyle == 'tbl_5') {
                this.courseTotal = 8;
            } else {
                this.courseTotal = 6;
            }

        } else {
            this.templateService.configInfoAll.forEach(e => {
                if (e.id == this.id) {
                    this.moduleInfo = { ...e };
                }
            });
            this.initList();
            this.curCourseInfo = new Course();
        }

        // tslint:disable-next-line:max-line-length
        if (this.courseStyle == 'tbl_3' || this.courseStyle == 'tbl_4' || this.courseStyle == 'tbl_5' || this.courseStyle == 'tbl_6' || this.courseStyle == 'tbl_7') {
            this.isNew = true;
        } else {
            this.isNew = false;
        }
        this.initForm();
        this.columns = [
            { title: '图片', tpl: 'imgTpl', styleClass: 'text-center' },
            { title: '课程名称', data: 'name', styleClass: 'text-center' },
            { title: '所属组织', data: 'userGroupName' },
            { title: '课程描述', data: 'description', styleClass: 'text-center' },
        ];

    }

    initList() {
        this.courseInfo = [];
        if (this.courseStyle == 'tbl_1') {
            for (let i = 0; i < 5; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_2') {
            for (let i = 0; i < 10; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_3') {
            for (let i = 0; i < 8; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_4') {
            for (let i = 0; i < 7; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_5') {
            for (let i = 0; i < 8; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_6') {
            for (let i = 0; i < 6; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else {
            for (let i = 0; i < 9; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        }
    }
    initForm() {
        let m = this.moduleInfo;
        this.validateForm = this.fb.group({
            id: [m && m.id],
            moduleType: [m && m.moduleType || 'COURSE'],
            layout: { id: this.templateId },
            displayOrder: m && m.displayOrder,
            name: [m && m.name, [Validators.required], this.trimAsyncValidator],
            moreArticle: [m && m.moreArticle || false, [Validators.required]],
            layoutModuleTemplate: [{ id: m && m.layoutModuleTemplateId || 1 }],
            layoutModuleTemplateName: [m && m.layoutModuleTemplateName || 'tbl_1', [Validators.required]],
            layoutModuleObject: [null, [Validators.required]],
            isStrategy: [m && m.isStrategy || false],
            strategyCourse: [m && m.strategyCourse || null],
            configs: [[{ portalType: 'COURSE', objectType: null }]]
        });
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    trimAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ required: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    // 样式点击
    styleClick(item) {
        if (item.name != this.courseStyle) {
            let _this = this;
            this.confirmServ.confirm({
                title: '您是否确认要切换样式',
                content: '<b>切换样式后所有课程都被清空</b>',
                zIndex: 1003,
                onOk() {
                    _this.styleOk(item);
                },
                onCancel() {
                }
            });
        }

    }
    styleOk(item) {
        this.courseStyle = item.name;
        // tslint:disable-next-line:max-line-length
        if (this.courseStyle == 'tbl_3' || this.courseStyle == 'tbl_4' || this.courseStyle == 'tbl_5' || this.courseStyle == 'tbl_6' || this.courseStyle == 'tbl_7') {
            this.isNew = true;
        } else {
            this.isNew = false;
        }
        console.log(item, 444)
        this.validateForm.controls['layoutModuleTemplateName'].setValue(this.courseStyle);
        this.validateForm.controls['layoutModuleTemplate'].setValue({ id: item.id });
        this.courseTotal = item.positionNum;
        this.curCourse = 0;
        this.initList();
        this.curCourseInfo = this.courseInfo[0] || new Course();
        this.validateForm.controls['strategyCourse'].setValue(null);

    }

    // 切换课程
    changeCourse(item, bool?: boolean) {
        this.curCourse = item.positionTable;
        this.curCourseInfo = item || new Course();
        this.isNew = bool;
    }

    // 选择图片
    imageUpoad(image) {
        if (image) {
            this.curCourseInfo.imgUrl = image.relativePath;
            this.courseInfo[this.curCourse].imgUrl = image.relativePath;
        }
    }
    // 选择课程
    loadData() {
        this.loading = true;
        let params = {
            name: this.courseName,
            page: this.courseList.number || 0,
            size: this.courseList.size || 5,
            'userGroup.id': this.userGroup.id
        };

        this.templateService.getCourseList(params).subscribe(
            obj => {
                this.courseList = obj;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        )
    }

    getParams() {
        let params = {
            page: this.courseList.number || 0,
            size: this.courseList.size || 5,
            name: this.courseName,
            includeChildren: false
        };
        if (this.userGroup && this.userGroup.id) {
            params['userGroup.id'] = this.userGroup.id;
        }
        return params;
    }
    // 选择课程
    selectCourse() {
        this.isShow = true;
        this.courseList = {};
        this.loadData();
    }

    handleCancel() {
        this.isShow = false;
    }
    isOk() {
        if (this.selection) {
            this.isShow = false;
            this.curCourseInfo = {
                ...this.curCourseInfo,
                id: this.selection[0].id,
                name: this.selection[0].name,
                imageUrl: this.selection[0].offeringCourse.course.imageUrl,
            }
            this.courseInfo[this.curCourse] = {
                ...this.courseInfo[this.curCourse],
                id: this.selection[0].id,
                name: this.selection[0].name,
                imageUrl: this.selection[0].offeringCourse.course.imageUrl,
            }
            this.courseCout();
        } else {
            tipMessage('请至少选择一项');
        }
    }

    // 返回
    onBack() {
        this.back.emit()
    }

    // 课程数量验证
    courseCout() {
        let arr = [];
        let allHas = true;
        this.validateForm.controls['layoutModuleObject'].setValue(null);
        this.courseInfo.forEach(item => {
            arr.push({
                id: item.id,
                positionTable: item.positionTable,
                imgUrl: item.imgUrl
            })
            if (!item.id) {
                allHas = false;
            }
        });
        if (allHas) {
            this.validateForm.controls['layoutModuleObject'].setValue(arr);
        }
    }
    // 保存
    save() {
        this.courseCout();
        let strategyCourse = this.validateForm.controls['strategyCourse'].value;
        this.validateForm.controls['configs'].setValue([{ portalType: 'COURSE', objectType: strategyCourse }])
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.saveLoading = true;
        return this.templateService.saveCourse(this.validateForm.value).subscribe(
            obj => {
                tipMessage('保存成功', 'success');
                this.refresh.emit(obj);
                this.saveLoading = false;
            },
            error => {
                tipMessage('保存失败');
                this.saveLoading = false;
            }
        )
    }

    isConfig() {
        this.curCourseInfo = new Course();
        this.initList();
        this.validateForm.controls['strategyCourse'].setValue(null);
    }
    selectChange(e) {
        if (e) {
            let params = {
                num: this.courseTotal,
                courseType: e
            }
            this.templateService.getStrategory(params).subscribe(
                data => {
                    this.initList();
                    data.forEach((item, i) => {
                        item = {
                            ...item,
                            'id': item.id,
                            'name': item.name,
                            'imageUrl': item.imageUrl,
                        }
                        if (i < this.courseInfo.length) {
                            this.courseInfo[i] = item;
                        }
                    });
                    this.courseCout();
                }
            )
        } else {
            this.initList();
        }
    }

}
