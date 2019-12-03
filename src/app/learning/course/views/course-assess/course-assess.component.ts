import { Course } from './../../../../home/entity/course';
import { AssessService } from './../../../../assess/assess.service';
import { Paper } from './../../../../assess/paper.model';
import { PaperService } from './../../../../assess/paper.service';
import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Assess } from 'app/assess/assess.model';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-assess',
    templateUrl: './course-assess.component.html',
    styleUrls: ['./course-assess.component.scss']
})
export class CourseAssessComponent implements OnInit {

    pagination: CuiPagination;
    assesses: Assess[];
    columns;
    loading: boolean = true;
    isVisible: boolean = false;
    paperId: number;
    assessId: number;
    showEdie: boolean = false;

    allPapers: Assess[];
    isShowSourse: boolean = false; // 资源库
    sourseColumns;
    sourseSelected: any;
    sourseText;
    bLoading: boolean = false;

    offeringId: number;
    courseId: number;
    assessType: string;
    targetType: string;

    constructor(private paperService: PaperService,
        private router: Router,
        private message: NzMessageService,
        private assessService: AssessService,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '评估名称', data: 'name' },
            { title: '描述', data: 'description' },
            { title: '开始时间', tpl: 'start-date' },
            { title: '结束时间', tpl: 'end-date' },
            { title: '状态', data: 'status', tpl: 'statusTpl' }
        ];
        this.sourseColumns = [
            { title: '模板名称', data: 'name' },
            { title: '描述', data: 'description' }
        ];
    }
    ngOnInit() {
        this.route.data.subscribe(obj => {
            this.targetType = obj.type;
            if (this.targetType == 'SUBJECT_COURSE') {// 如果是专区
                this.assessType = 'SELF_SUBJECT_COURSE';
                this.route.params.subscribe(
                    (params: Params) => {
                        this.offeringId = params['subjectId'] as number;
                        this.courseId = params['courseId'] as number;
                        if (!this.offeringId) {
                            this.offeringId = params['id'] as number;
                            this.route.data.subscribe((data: { course: Course }) => {
                                this.courseId = data.course.id;
                            });
                        }
                    });
            } else if (this.targetType == 'CLASSROOM_COURSE') {// 培训班
                this.assessType = 'SELF_CLASSROOM_COURSE';
                this.route.params.subscribe(
                    (params: Params) => {
                        this.offeringId = params['tbcId'] as number;
                        this.courseId = params['courseId'] as number;
                        if (!this.offeringId) {
                            this.offeringId = params['id'] as number;
                            this.route.data.subscribe((data: { course: Course }) => {
                                this.courseId = data.course.id;
                            });
                        }
                    });
            }
        });
        // if (this.router.url.substring(0, 2).toString() == '/s') { // 如果是专区
        //   this.assessType = 'SELF_SUBJECT_COURSE';
        //   this.targetType = 'SUBJECT_COURSE';
        //   this.route.params.subscribe(
        //     (params: Params) => {
        //       this.offeringId = params['subjectId'] as number;
        //       this.courseId = params['courseId'] as number;
        //       if (!this.offeringId) {
        //         this.offeringId = params['id'] as number;
        //         this.route.data.subscribe((data: { course: Course }) => {
        //           this.courseId = data.course.id;
        //         });
        //       }
        //     });
        // } else { // 培训班
        //   this.assessType = 'SELF_CLASSROOM_COURSE';
        //   this.targetType = 'CLASSROOM_COURSE';
        //   this.route.params.subscribe(
        //     (params: Params) => {
        //       this.offeringId = params['tbcId'] as number;
        //       this.courseId = params['courseId'] as number;
        //       if (!this.offeringId) {
        //         this.offeringId = params['id'] as number;
        //         this.route.data.subscribe((data: { course: Course }) => {
        //           this.courseId = data.course.id;
        //         });
        //       }
        //     });
        // }

        this.loadData();
    }

    loadData() {
        let params = {
            // assessType: this.assessType,
            targetType: this.targetType,
            offeringId: this.offeringId,
            courseId: this.courseId
        };
        this.loading = true;
        this.paperService.trainCourseList(params).subscribe(
            pag => {
                this.loading = false;
                this.assesses = pag;
            },
            err => {
                this.loading = false;
            }
        );
    }

    delete(row) {
        let params = {
            assessId: row.id,
            offeringId: this.offeringId,
            courseId: this.courseId,
            targetType: this.targetType
        }
        this.paperService.trainDelete(params).subscribe(
            () => {
                tipMessage('删除成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage(err);
            }
        );
        /* this.modal.confirm({
          title: `确定要删除吗？`,
          onOk: () => {
          }
        }); */
    }

    onPublish(assess) {
        assess.isPublished = !assess.isPublished;
        assess.lastModifiedDate = null;
        this.paperService.trainEdit(assess).subscribe(
            papers => {
                tipMessage('取消发布成功', 'success');
                this.loadData();
            }
        );
    }

    confirmPublish(assess) {
        assess.isPublished = !assess.isPublished;
        assess.lastModifiedDate = null;
        this.assessService.confirmPublish(assess.paper.id).subscribe(
            data => {
                if (data.length > 0) {
                    this.assessService.edit(assess).subscribe(
                        papers => {
                            tipMessage('发布成功', 'success');
                            this.loadData();
                        }
                    );
                } else {
                    tipMessage('问卷信息不完善，不能发布', 'warning', 3000);
                    this.loadData();
                }
            }
        );
    }



    handleCancel(e) {
        this.isVisible = false;
        this.loadData();
    }
    closeModal() {
        this.isVisible = false;
        this.loadData();
    }

    // 资源库
    loadSourse(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.sourseText,
            assessType: 'COURSE',
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : '',
        };
        this.loading = true;
        this.paperService.trainPublishList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.allPapers = pag.content;
                this.loading = false;
            }
        );
    }

    showModal(row?: any) {
        if (row == true) {
            this.modal.confirm({
                title: `重新创建会覆盖原有评估，确定重新创建吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.createAssess();
                }
            });
        } else {
            this.createAssess(row);
        }
    }
    createAssess(row?: any) {
        this.isVisible = true;
        if (row) {
            this.paperId = row.paper.id;
            this.assessId = row.id;
            this.showEdie = true;
        } else {
            this.paperId = null;
            this.assessId = null;
            this.showEdie = false;
        }
    }
    showSourse(flag?: any) {
        if (flag == true) {
            this.modal.confirm({
                title: `重新引用会覆盖原有评估，确定重新引用吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.loadSourse();
                    this.isShowSourse = true;
                }
            });
        } else {
            this.loadSourse();
            this.isShowSourse = true;
        }
    }
    closeSourse(e) {
        this.isShowSourse = false;
    }
    saveSourse() {
        this.bLoading = true;
        if (this.sourseSelected) {
            const selectedIds = this.sourseSelected.map(it => it.id);
            let params = {
                assesses: selectedIds,
                targetType: this.targetType,
                courseId: this.courseId
            }
            this.paperService.copySourse(this.offeringId, params).subscribe(
                ok => {
                    this.bLoading = false;
                    this.isShowSourse = false;
                    this.loadData();
                }
            )
        } else {
            this.bLoading = false;
            tipMessage('请选择一个评估', 'warning');
        }
    }

    toAnalysis(row) {
        // 判断是否有作答记录
        this.paperService.getTotalAnswer(this.offeringId, row.paper.id).subscribe(
            allAnswer => {
                if (allAnswer > 0) {
                    this.router.navigate([row.paper.id, 'analysis'],
                        { relativeTo: this.route, queryParams: { assessId: row.id, offeringId: this.offeringId, assessType: 'ASSESS' } });
                } else {
                    tipMessage('暂无人员参与作答', 'warning');
                }
            });
    }
}
