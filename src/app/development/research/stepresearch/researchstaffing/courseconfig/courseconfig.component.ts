import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../../../service/research.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-courseconfig',
    templateUrl: './courseconfig.component.html',
    styleUrls: ['./courseconfig.component.scss']
})
export class CourseconfigComponent implements OnInit {
    _form: FormGroup;
    displayName: any;
    spinning: boolean = false;
    testListData: any;
    selection: any[] = [];
    devStatus: any;
    phaseId: any;
    devId: any;
    isVisible: boolean = false; // 添加课时的modal
    editspinning: boolean = false; // 编辑course时的loading
    api: any;
    btnstate: boolean = false;
    editId: any;
    columns = [
        { title: '讲师姓名', tpl: 'name', styleClass: 'text-left' },
        { title: '讲师类别', tpl: 'teacherType', styleClass: 'text-center' },
        { title: '所属阶段', tpl: 'step', styleClass: 'text-left' },
        { title: '课时量', tpl: 'courseHour', styleClass: 'text-right' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    initFormData: any = {
        devname: [''], // 研发项目
        userGroup: [''], // zhuban单位
        teachername: [''], // 讲师姓名
        teacherNo: [''], // 讲师编号
        teacherType: [''], // jiangshi级别
        courseHour: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
        teacherIds: [[], [Validators.required]],
        jobContent: [''],
        result: ['']
    };
    // 加载数据
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            name: this.displayName ? this.displayName : ''
        };
        this.service.getcourseList(this.phaseId, params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
                // console.log(res, 44)
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
        private service: ResearchService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.routeInfo.paramMap.subscribe(
            params => {
                this.phaseId = params.get('stepId');
                this.devId = params.get('id');
            }
        )
        this.routeInfo.queryParams.subscribe(
            params => {
                this.devStatus = params.status;
            }
        )
        this.api = `/api/phase/${this.phaseId}/dev/teacher/add/list`
        this.loadData();
    }
    // 搜索列表
    searchData() {
        this.loadData();
    }
    // 快速生成
    fastgeneration(event) {
        this.confirmv.confirm({
            title: '快速生成',
            content: '确定要快速生成？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.fastgetcoursehour(this.phaseId).subscribe(
                    res => {
                        tipMessage('快速生成成功！', 'success');
                        this.loadData();
                    },
                    err => {
                        return tipMessage('快速生成失败！');
                    }
                )
            },
            onCancel() { }
        })
    }
    // 删除
    mutipledelete(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            this.confirmv.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.deletecourse(this.phaseId, { ids: ids }).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        err => {
                            return tipMessage('删除失败！');
                        }
                    )
                }
            })
        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    // 添加
    addstpcourse(event) {
        this.isVisible = true;
        this._form = this.fb.group(this.initFormData);
        this.editspinning = true;
        this.service.getdevname(this.devId).subscribe(
            res => {
                // console.log(res);
                this.editspinning = false;
                this._form.get('devname').setValue(res.name);
                this._form.get('userGroup').setValue(res.researchPlan.userGroup.name);
            },
            err => {
                this.editspinning = false;
                return tipMessage(err);
            }
        )
    }
    // 编辑
    editCourse(value) {
        this.editspinning = true;
        this.isVisible = true;
        this.editId = value.id;
        this._form = this.fb.group(this.initFormData);
        this.service.getdevname(this.devId).subscribe(
            res => {
                this._form.get('devname').setValue(res.name);
                this._form.get('userGroup').setValue(res.researchPlan.userGroup.name);
                this.service.geteditcoursemessage(this.phaseId, this.editId).subscribe(
                    result => {
                        console.log(result)
                        this.editspinning = false;
                        this._form.get('courseHour').setValue(result.courseHour);
                        this._form.removeControl('teacherIds');
                        this._form.get('jobContent').setValue(result.jobContent);
                        this._form.get('result').setValue(result.result);
                        this._form.get('teacherNo').setValue(result.teacher.teacherNo);
                        // tslint:disable-next-line:max-line-length
                        this._form.get('teacherType').setValue(result.teacher.teacherType == 'EXTERNAL' ? '外部讲师' : (result.teacher.teacherType == 'FULLTIME' ? '专职讲师' : (result.teacher.teacherType == 'PARTTIME' ? '兼职讲师' : '')));
                        this._form.get('teachername').setValue(result.teacher.teacherType == 'EXTERNAL' ? (result.teacher.name) : (result.teacher.user ? result.teacher.user.displayName : ''))
                    },
                    error => {
                        this.editspinning = false;
                        return tipMessage(error);
                    }
                )
            },
            err => {
                this.editspinning = false;
                return tipMessage(err);
            }
        )
    }
    // modal的显示影藏
    handleCancel(event) {
        this.isVisible = false;
        this.editId = undefined;
    }
    handleOk(event) {
        this.isVisible = false;
    }
    // remove
    remove(value) {
        console.log(value);
        // value.u删除的 value.v选择总的
        this._form.get('teacherIds').setValue(value.value);
    }
    // baocun
    _saveformmessage(event, value) {
        if (this._form.invalid) {
            return tipMessage('请按要求填写完成！');
        }
        let objParams = {
            ...value,
            teacherIds: value.teacherIds ? this.getIds(value.teacherIds) : ''
        }
        delete objParams.devname;
        delete objParams.userGroup;
        delete objParams.teacherNo;
        delete objParams.teacherType;
        delete objParams.teachername;

        this.btnstate = true;
        if (this.editId) {
            let editObjParams = {
                ...objParams
            }
            delete editObjParams.teacherIds
            this.service.saveEditCourse(this.phaseId, this.editId, editObjParams).subscribe(
                res => {
                    this.btnstate = false;
                    this.isVisible = false;
                    this.editId = undefined;
                    this.loadData();
                    tipMessage('编辑成功！', 'success');
                },
                error => {
                    this.btnstate = false;
                    return tipMessage(error);
                }
            )
        } else {
            this.service.addcourse(this.phaseId, objParams).subscribe(
                res => {
                    this.btnstate = false;
                    this.isVisible = false;
                    this.loadData();
                    tipMessage('保存成功！', 'success');
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        }
    }
    // 得到讲师数组的ids
    getteacherIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.teacher.id)
        })
        return ids;
    }
    // 获取讲师的ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 过滤掉数据
    filterdeleteTeacher(u: any, v: any[]) {
        return v.filter((item, index) => {
            return u.id = item.id
        })
    }

}
