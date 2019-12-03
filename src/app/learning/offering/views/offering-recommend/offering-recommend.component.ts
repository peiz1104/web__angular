import { OfferingRecommend } from './../../entity/offering-recommend';
import { Column } from 'console-ui-ng';
import { ClassroomService } from './../../../classroom/service/classroom.service';
import { Classroom } from './../../../classroom/entity/classroom';
import { Pagination } from './../../../../core/entity/pagination';
import { Component, OnInit } from '@angular/core';
import { OfferingRecommendService } from 'app/learning/offering/service/offering-recommend.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-offering-recommend',
    templateUrl: './offering-recommend.component.html',
    styleUrls: ['./offering-recommend.component.scss']
})
export class OfferingRecommendComponent implements OnInit {
    // 可以推荐的课程培训列表相关属性
    classrooms: Pagination<Classroom>;
    checkedClassrooms: Classroom[];
    classroomPage;
    classroomerr;
    classroomLoading: boolean = true;
    searcher: Classroom = new Classroom();
    includeChildren: boolean = false;
    classroomColumns: Column[] = [
        { title: '名称', data: 'name' },
        { title: '所属组织', data: 'userGroupName' },
        { title: '开始时间', tpl: 'classroom-start-date', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'classroom-end-date', styleClass: 'text-center' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' }
    ]


    // 已推荐好课列表相关属性
    checkedRecommendIds: number[];
    recommendPage;
    recommendLoading: boolean = true;
    offeringRecommend: OfferingRecommend = new OfferingRecommend();
    recommends: Pagination<OfferingRecommend>;
    recommendColumns: Column[] = [
        { title: '名称', data: 'offeringName' },
        { title: '所属站点', data: 'siteName' },
        { title: '序号', data: 'displaySort' },
        { title: '移动', tpl: 'moveTpl', styleClass: 'text-center' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' }
    ]

    constructor(
        private classroomService: ClassroomService,
        private offeringRecommendService: OfferingRecommendService,
        private message: NzMessageService,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.loadRecommends();
    }

    getClassroomParams() {
        let params = {};
        params['includeChildren'] = false;
        if (this.includeChildren) {
            params['includeChildren'] = true;
        }
        Object.keys(this.searcher).map(it => {
            if (it != 'userGroup' && this.searcher[it]) {
                params[it] = this.searcher[it];
            }
        });
        if (this.searcher.userGroup && this.searcher.userGroup.id) {
            params['userGroup.id'] = this.searcher.userGroup.id;
        }
        return params;
    }

    loadClassrooms(page?: any) {
        this.classroomLoading = true;
        this.classroomService.getCanRecommends(this.getClassroomParams(), page).subscribe(
            cs => {
                this.classrooms = cs;
                this.classroomLoading = false
                this.checkedClassrooms = undefined;
            },
            err => {
                tipMessage(err);
                this.classroomLoading = false
            }
        );
    }

    loadRecommends(page?: any) {
        /*
         把offeringRecommend的引用传递给getAllOfPage的params参数因为offeringrecommend 是全局变量
        所以在page 不为 undifined时 getAllOfPage 内部为其添加size 和 page 属性，导致下次page为undifined时候
        size和page属性依旧是上一次的而不是从第一页显示。
        */
        if (!page) {
            this.offeringRecommend["size"] = 10;
            this.offeringRecommend["page"] = 0;
        }
        this.recommendLoading = true;
        this.offeringRecommendService.getAllOfPage(this.offeringRecommend, page).subscribe(
            cs => {
                this.recommends = cs;
                this.recommendLoading = false
                this.checkedRecommendIds = undefined;
            },
            err => {
                tipMessage(err);
            }
        );
    }

    batchRecommend(classroom: Classroom, single_flag?: boolean) {
        let classrooms = classroom ? [classroom] : this.checkedClassrooms;
        if (!classrooms || classrooms.length <= 0) {
            tipMessage('请选择需要推荐为好课的课程培训', 'warning');
            return;
        }
        let recommends = [];
        for (let letclassroom of classrooms) {
            let recommend = {
                'offering': { id: letclassroom.id },
                'site': { id: letclassroom.siteId }
            };
            recommends.push(recommend);
        }
        if (single_flag) {
            this.offeringRecommendService.batchRecommends(recommends).subscribe(
                ok => {
                    this.message.info("推荐成功");
                    this.loadClassrooms();
                },
                err => {
                    this.message.error(err);
                }
            );
        } else {
            this.modal.confirm({
                title: "确认要将选中的课程培训推荐为好课吗？",
                zIndex: 1003,
                onOk: () => {
                    this.offeringRecommendService.batchRecommends(recommends).subscribe(
                        ok => {
                            tipMessage('推荐成功', 'info');
                            this.loadClassrooms();
                        },
                        err => {
                            tipMessage(err);
                        }
                    );
                }
            })
        }
    }

    cancelRecommends(id?: number, single_flag?: boolean) {
        let ids = id ? [id] : this.checkedRecommendIds;
        if (!ids || ids.length <= 0) {
            tipMessage('请选择要取消推荐的好课！', 'warning');
            return;
        }
        if (single_flag) {
            this.offeringRecommendService.delete(ids).subscribe(
                ok => {
                    this.message.info("取消成功");
                    this.loadRecommends();
                },
                err => {
                    this.message.error(err);
                }
            );
        } else {
            this.modal.confirm({
                title: "确认要取消推荐选中的好课吗？",
                zIndex: 1003,
                onOk: () => {
                    this.offeringRecommendService.delete(ids).subscribe(
                        ok => {
                            tipMessage('取消成功', 'info');
                            this.loadRecommends();
                        },
                        err => {
                            tipMessage(err);
                        }
                    );
                }
            })
        }
    }

    move(sourceId: number, operate: 'up' | 'down') {
        let param = {
            sourceId: sourceId,
            operate: operate,
            offeringName: this.offeringRecommend.offeringName
        };
        this.offeringRecommendService.moveOffering(param).subscribe(
            ok => {
                tipMessage('操作成功', 'info');
                this.loadRecommends();
            },
            err => {
                tipMessage(err);
            }

        );
    }

    _tabChange(tab) {
        let index = tab.index;
        this.offeringRecommend.offeringName = '';
        this.searcher.name = '';
        if (index > 0) {
            this.loadClassrooms();
        } else {
            this.loadRecommends();
        }
    }

    onSelect(selIds) {
        this.checkedRecommendIds = selIds;
    }

}
