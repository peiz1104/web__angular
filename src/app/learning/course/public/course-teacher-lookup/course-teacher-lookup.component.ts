import { UserGroup } from '../../../../system/entity/user-group';
import { Course } from './../../entity/course';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { CourseTeacherService } from './../../service/course-teacher.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Teacher } from '../../../../library/entity/teacher';
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
    selector: 'spk-course-system-teacher-lookup',
    templateUrl: './course-teacher-lookup.component.html',
    styleUrls: ['./course-teacher-lookup.component.scss']
})
export class CourseTeacherLookupComponent implements OnInit {
    @Input() course: Course;

    page: Pagination<any>;
    teachers: Teacher[];
    loading: boolean;
    selection: Teacher[];
    _searchForm: FormGroup;
    searcher: Teacher = new Teacher();
    userGroup: UserGroup;

    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo' },
        { title: '讲师工号', data: 'username' },
        { title: '讲师姓名', tpl: 'teahcerNameCol' },
        { title: '讲师类型', tpl: 'teacherTypeCol', styleClass: 'text-center' },
        { title: '性别', tpl: 'sexCol', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'userGroupNameCol', visible: true },
        { title: '出生日期', tpl: 'birthdayFormat', styleClass: 'text-center' }
    ];

    constructor(
        private subject: NzModalSubject,
        private teacherService: CourseTeacherService,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initSearchForm();
      this.authService.getCurrentUser().subscribe(
        user => {
          if (user.managerGroup) {
            this.searcher.userGroup = user.managerGroup;
          }
          this.loadData();

        }
      )
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
        });
    }
    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.teacherService.lookupList(this.course.id, this.getParams(page)).subscribe(
            list => {
                this.page = list;
                this.teachers = this.page.content;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }
    getParams(page) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }
        if (this.searcher.userGroup && this.searcher.userGroup.id) {
            params['userGroup.id'] = this.searcher.userGroup.id;
        } else {
            params['userGroup.id'] = 0;
        }
        if (this.searcher.name) {
            params['name'] = this.searcher.name;
        } else {
            params['name'] = '';
        }
        return params;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.loadData();
    }

    emitDataOutside(e) {
        this.subject.next({ event: 'onOk', data: this.selection });
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    sex(teacher) {
        if (teacher.teacherType) {
            if (teacher.teacherType == "EXTERNAL") {
                if (teacher.sex && "MALE" == teacher.sex) {
                    return "男";
                }
                if (teacher.sex && "FAMALE" == teacher.sex) {
                    return "女";
                }
            }
            if (teacher.teacherType != "EXTERNAL" && teacher.user) {
                if (teacher.user.sex && "MALE" == teacher.user.sex) {
                    return "男";
                }
                if (teacher.user.sex && "FAMALE" == teacher.user.sex) {
                    return "女";
                }
            }
        }
    }

}
