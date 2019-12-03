import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { TeacherService } from 'app/library/service/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Teacher } from 'app/library/entity/teacher';
import { isArray } from "util";
import { UserGroup } from 'app/system/entity/user-group';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-list',
    templateUrl: './teacher-list.component.html',
    styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
    userGroup: UserGroup;
    teacher: Teacher[];
    pagination: CuiPagination;
    columns;
    loading: boolean = true;
    searchtext;
    selected: number[];

    constructor(private teacherService: TeacherService,
        private router: Router,
        private message: NzMessageService,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '讲师编号', data: 'teacherNo' },
            { title: '讲师姓名', data: 'name' },
            { title: '讲师类型', data: 'teacherType', tpl: 'teacherTypeCol' },
            { title: '性别', data: 'sex', tpl: 'sexCol' },
            { title: '所属组织', data: 'userGroup', tpl: 'groupCol' },
            { title: '任教时间', tpl: 'startDate' }
        ];
    }

    ngOnInit() {
        this.loadData();
    }
    onSelect(selIds: any[]) {
        this.selected = selIds;
    }
    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            'userGroup.id': this.userGroup && this.userGroup.id ? this.userGroup.id : '',
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.teacherService.pageList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.teacher = pag.content;
                this.loading = false;
            }
        );
    }
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
        this.loadData();
    }
    delete(id?, single_flag?: boolean) {
        let ids = id ? [id] : this.selected;
        if (ids && ids.length != 0) {
            if (single_flag) {
                this.teacherService.delete(ids).subscribe(
                    () => {
                        this.message.success('删除成功');
                        this.loadData();
                    },
                    err => { this.message.error(err); }
                );
            } else {
                this.modal.confirm({
                    title: `确定要删除选择的讲师吗？`,
                    zIndex: 1003,
                    onOk: () => {
                        this.teacherService.delete(ids).subscribe(
                            () => {
                                tipMessage('删除成功', 'success');
                                this.loadData();
                            },
                            err => {
                                tipMessage(err);
                            }
                        );
                    }
                });
            }
        } else {
            tipMessage('请选择删除项', 'warning');
        }
    }
}
