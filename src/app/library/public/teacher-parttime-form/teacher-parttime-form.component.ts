import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherPartService, TeachernewService } from './../../service/teachernew.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-parttime-form',
    templateUrl: './teacher-parttime-form.component.html',
    styleUrls: ['./teacher-parttime-form.component.scss']
})
export class TeacherParttimeFormComponent implements OnInit {
    @ViewChild("lookupModaluser") lookupModaluser;
    @Input() teacher: any = {};
    @Input() isEdit?: boolean = false;
    @Input() isStarShow;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    isJunior: boolean = false;
    isLecturer: boolean = false;
    isSenior: boolean = false;
    starValue: any;
    tid: number;
    isShow: boolean = true;

    validateForm: FormGroup;
    userId: number;
    newId: number;
    username: string;
    constructor(
        private fb: FormBuilder,
        private teachernewService: TeachernewService,
        private teacherPartService: TeacherPartService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        if (!this.isStarShow) {
            this.teacher.star = 0;
            this.isJunior = true;
            this.isLecturer = true;
            this.teacher.channel = "STAFF";
        }
        this.initForm(this.teacher);
        if (this.teacher && this.teacher.rank) { // 星级显示
            if (this.teacher.rank == 'JUNIOR') {
                this.isJunior = true;
            } else if (this.teacher.rank == 'LECTURER') {
                this.isLecturer = true;
            } else if (this.teacher.rank == 'SENIOR') {
                this.isSenior = true;
            }
        }
        this.tid = null;

    }

    initForm(m) {
        if (m.user && m.user.userGroup && m.user.userGroup.type) {
            if (m.user.userGroup.type == 'SAP') {
                m.channel = 'STAFF';
                this.isShow = false; // 编辑时星级是否显示
            }
            if (m.user.userGroup.type == 'GMIS') {
                m.channel = 'GROUP';
            }
            if (m.user.userGroup.type == 'TMIS' || m.user.userGroup.type == 'XMIS') {
                m.channel = 'ELECTRIC';
            }
            if (m.user.userGroup.type == 'BMIS') {
                m.channel = 'BANK';
            }
        }
        // let m = this.teacher || {};
        this.validateForm = this.fb.group({
            username: [m.user && m.user.username],
            teacherName: [m.user && m.user.displayName, [Validators.required]],
            mz: [m.user && m.user && m.user.userAttribute && m.user.userAttribute.nationalMz],
            userGroupId: [m.user && m.user.userGroup.name, [Validators.required]],
            sex: m.user && m.user.sex,
            sexText: [m.user && (m.user.sex == 'MALE' ? '男' : '女')],
            birthday: [m.user && m.user.userAttribute && moment(m.user.userAttribute.birthday).unix() || ''],
            phoneNumber: [m.user && m.user.phoneNumber],
            email: [m.user && m.user.email],
            oldRank: m.rank,
            rank: [m.rank, [Validators.required]], // 职级
            channel: [m.channel, [Validators.required]], // 渠道
            star: [m.star, [Validators.required]], // 星级
            qualifications: [m.qualifications], // 讲师资格
            inductionTime: [m.inductionTime], // 入职时间
            startDate: [m.startDate], // 任教开始时间
            classHour: [m.classHour], // 课时数
            avgScore: [m.avgScore], // 平均得分
            schoolName: [m.schoolName], // 毕业学校
            graduationTime: [m.graduationTime], // 毕业时间
            major: [m.major], // 所学专业
            education: [m.education], // 学历
            degree: [m.degree], // 学位
            workSummary: [m.workSummary], // 工作小结
            description: [m.description], // 描述
            inputValue: ['兼职讲师'],
        });
        this.starValue = m.star;
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
        if (!this.isStarShow || !this.isShow) {
            this.validateForm.get('star').setValue(0);
            this.validateForm.get('channel').setValue('STAFF');
        }
        if (this.validateForm.invalid) {
            return tipMessage('请按要求填写表单');
        }
        this.loading = true;


        if (this.tid) {
            this.validateForm.value['id'] = this.tid;
        }
        this.validateForm.value['userId'] = this.userId;
        this.validateForm.value['userGroupId'] = this.newId;
        this.validateForm.value['username'] = this.username;
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
    }

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    back(event) {
        this.cancel.emit({ originalEvent: event });
    }
    userLookupOk(e) {
        console.log(e, 446);
        if (this.isStarShow) {
            if (e[0].userGroup.type == 'AMIS') {
                this.lookupModaluser.clear()
                return tipMessage('个险人员不能添加,请重新选择!', '', 4000);
            }
            if (e[0].userGroup.type == 'SAP') { // 新增时星级是否显示
                this.isShow = false;
            }
        }

        this.teacherPartService.isHas(e[0].id).subscribe(
            res => {
                if (res && res.id && !res.isDeleted) { // 讲师未删除的
                    this.lookupModaluser.clear();
                    tipMessage('讲师已存在，请重新选择');
                    this.isShow = true;
                } else {
                    this.userId = e[0].id;
                    this.newId = e[0].userGroup.id;
                    this.username = e[0].username;
                    this.tid = res.id;
                    this.initForm({ user: e[0] });
                    this.validateForm.get('username').setValue(e);
                }
            }
        )

    }
    // 选择讲师级别
    changeRank(value) {
        // console.log(value)
        if (value == 'JUNIOR') {
            this.isJunior = true;
            this.isLecturer = false;
            this.isSenior = false;
            this.starValue = 0;
        }
        if (value == 'LECTURER') {
            this.isLecturer = true;
            this.isJunior = false;
            this.isSenior = false;
            this.starValue = 2;
        }
        if (value == 'SENIOR') {
            this.isSenior = true;
            this.isJunior = false;
            this.isLecturer = false;
            this.starValue = 4;
        }
    }
}
