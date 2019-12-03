import { error } from 'util';
import { Column, CuiLayer } from 'console-ui-ng';
import { ClassroomService } from './../../service/classroom.service';
import { Classroom } from './../../entity/classroom';
import { Pagination } from './../../../../core/entity/pagination';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-list',
    templateUrl: './classroom-list.component.html',
    styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {
    classrooms: Pagination<Classroom>;
    selected: Classroom[] = [];
    err: any;
    page;
    searcher: Classroom = new Classroom();
    isPublished = '';
    includeChildren: boolean = false;
    loading: boolean = true;
    columns: Column[] = [
        // { title: 'ID', data: 'id' },
        { title: '缩略图', tpl: 'imgscal' },
        { title: '名称', data: 'name' },
        { title: '所属组织', data: 'userGroupName' },
        { title: '类型', tpl: 'courseType' },
        { title: '所属分类', tpl: 'category' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '状态', tpl: 'classroomStatus' },
        // { title: '认证', tpl: 'enableAccredit' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' }
    ]

    isPublishedOptions = [
        { value: '', label: '全部' },
        { value: '0', label: '未发布' },
        { value: '1', label: '已发布' },
    ];
    @ViewChild('dataTable') dataTable;
    constructor(private classroomService: ClassroomService) { }

    ngOnInit() {
        this.dataTable.isComplexSearch = true;
        this.loadData();
    }

    getCourseType(typeStr) {
        let t = '--'
        switch (typeStr) {
            case 'ONLINE':
                t = '在线课程'
                break;
            case 'LIVE':
                t = '直播课程'
                break;
            case 'OFFLINE':
                t = '面授课程';
                break;
            default:
                t = '--';
                break;
        }

        return t;
    }

    getParams() {
        let params = {};
        params['includeChildren'] = false;
        if (this.includeChildren) {
            params['includeChildren'] = true;
        }
        params['isPublished'] = this.isPublished;
        Object.keys(this.searcher).map(it => {
            if (it != 'userGroup' && this.searcher[it]) {
                params[it] = this.searcher[it];
            }
        });
        if (this.searcher.userGroup && this.searcher.userGroup.id) {
            params['userGroup.id'] = this.searcher.userGroup.id;
        }
        if (this.searcher.category && this.searcher.category.id) {
            params['offeringCourse.course.category.id'] = this.searcher.category.id;
        }
        delete params['category'];
        delete params['userGroup'];
        return params;
    }

    loadData(page?: any) {

        if (!page) {
            page = this.page;
        }
        this.classroomService.getAllOfPage(this.getParams(), page).subscribe(
            cs => {
                this.classrooms = cs;
                this.page = page;
                this.selected = [];
                this.loading = false;
            },
            err => {
                this.err = err;
                this.loading = false;
            }
        );
    }
    doPublish() {
        if (this.selected.length == 0) {
            return tipMessage('请选择要发布的项')
        }
        // 判断是否由发布的项，已发布的过滤，全部发布给提示
        if (this.selected.length) {
            let ap = this.allPublish(this.selected);
            let op = this.onePublish(this.selected);
            let ids = [];
            if (ap) {
                return tipMessage('所选项都已发布，无需再次发布', '', 4000)
            }
            if (op) {
                tipMessage('将会过滤掉已发布项')
                let filterArray = this.filterPublish(this.selected);
                ids = this.getids(filterArray);

            } else {
                ids = this.getids(this.selected)
            }
            this.classroomService.publish(ids).subscribe(
                () => {
                    tipMessage('发布成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err.message);
                }
            );
        }
    }
    cancelPublish() {
        if (this.selected.length == 0) {
            return tipMessage('请选择取消发布的项')
        }
        // 未发布过滤，全部未发布提示
        let ac = this.allCancle(this.selected);
        let oc = this.onCancle(this.selected);
        let ids = [];
        if (ac) {
            return tipMessage('所选项都未发布，无需取消发布', '', 3000)
        }
        if (oc) {
            tipMessage('所选项中有取消发布项，将会过滤', '', 4000);
            let filterArray = this.filterCancel(this.selected);
            ids = this.getids(filterArray);
        } else {
            ids = this.getids(this.selected)
        }
        this.classroomService.cancel(ids).subscribe(
            () => {
                tipMessage('取消发布成功', 'success');
                this.loadData()
            },
            err => {
                tipMessage(err.message);
            }
        );
    }
    allPublish(array: any[]) {
        return array.every((item) => {
            return item.isPublished
        })
    }
    onePublish(array: any[]) {
        return array.some((item) => {
            return item.isPublished
        })
    }
    allCancle(array: any[]) {
        return array.every((item) => {
            return !item.isPublished
        })
    }
    onCancle(array: any[]) {
        return array.some((item) => {
            return !item.isPublished
        })
    }
    filterPublish(array: any[]) {
        return array.filter((item) => {
            return item.isPublished == false;
        })
    }
    filterCancel(array: any[]) {
        return array.filter((item) => {
            return item.isPublished == true;
        })
    }
    getids(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
    }
    publish(classrooms: Classroom[]) {
        if (classrooms && classrooms.length <= 0) {
            tipMessage('请选择需要操作的课程培训', '', 3000);
            return;
        }

        this.classroomService.publish(classrooms.map(it => it.id)).subscribe(
            () => {
                tipMessage('发布成功', 'success');
                classrooms.forEach(it => it.isPublished = true);
            },
            err => {
                tipMessage(err.message);
            }
        );
    }

    disPublish(classrooms: Classroom[]) {
        if (classrooms && classrooms.length <= 0) {
            tipMessage('请选择需要操作的课程培训', '', 3000);
            return;
        }

        this.classroomService.cancel(classrooms.map(it => it.id)).subscribe(
            () => {
                tipMessage('取消发布成功', 'success');
                classrooms.forEach(it => it.isPublished = false);
            },
            err => {
                tipMessage(err.message);
            }
        );
    }

    delete(classroom?: Classroom) {
        let ids = classroom ? [classroom] : this.selected;
        if (!ids || ids.length == 0) {
            tipMessage('请选择要删除的数据！');
            return;
        }

        let flag = true;
        ids.forEach(
            it => {
                if (it.isPublished) {
                    tipMessage("已发布的课程培训不能删除！", '', 3000);
                    flag = false;
                    return;
                }
            }
        )

        if (flag) {
            this.classroomService.delete(ids.map(it => it.id)).subscribe(
                () => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err.message);
                }
            );
        }
    }
    chooseCategory(value) {
        this.loadData();
    }
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
