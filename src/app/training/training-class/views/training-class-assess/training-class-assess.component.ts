import { AssessService } from './../../../../assess/assess.service';
import { Paper } from './../../../../assess/paper.model';
import { PaperService } from './../../../../assess/paper.service';
import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { Assess } from 'app/assess/assess.model';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-assess',
    templateUrl: './training-class-assess.component.html',
    styleUrls: ['./training-class-assess.component.scss']
})
export class TrainingClassAssessComponent implements OnInit {
    trainingId: number;
    trainingName: string;
    assesses: Assess[];
    pagination: CuiPagination;
    columns;
    searchtext;
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

    constructor(private paperService: PaperService,
        private router: Router,
        private assessService: AssessService,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
      { title: '评估名称', data: 'name' },
      // { title: '描述', data: 'description' },
      { title: '开始时间', tpl: 'start-date'},
      { title: '结束时间', tpl: 'end-date' },
      { title: '状态', data: 'status', tpl: 'statusTpl' }
        ];
        this.sourseColumns = [
      { title: '模板名称', data: 'name' },
      // { title: '描述', data: 'description' }
        ];
    }
    ngOnInit() {
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingId = obj.trainingClass.id;
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            assessType: 'SELF_CLASSROOM',
            offeringId: this.trainingId,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.paperService.trainList(this.trainingId, params).subscribe(
            pag => {
                this.pagination = pag;
                this.assesses = pag.content;
                this.loading = false;
            }
        );
    }

    delete(row) {
        if (!row.isPublished) {
          let params = {
            assessId: row.id,
            offeringId: this.trainingId,
            targetId: this.trainingId,
            targetType: 'CLASSROOM'
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
        } else {
            tipMessage('发布状态下不允许删除', 'warning');
        }

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
                    tipMessage('问卷信息不完善，不能发布', 'warning');
                    this.loadData();
                }
            }
        );
    }

    showModal(row?: any) {
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
            assessType: 'CLASSROOM',
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
    showSourse() {
        this.loadSourse();
        this.isShowSourse = true;
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
                targetId: this.trainingId
            }
            this.paperService.copySourse(this.trainingId, params).subscribe(
                ok => {
                    this.bLoading = false;
                    this.isShowSourse = false;
                    this.searchtext = '';
                    this.loadData();
                }
            )
        } else {
            this.bLoading = false;
            tipMessage('请至少选择一个评估');
        }
    }

    toAnalysis(row) {
        // 判断是否有作答记录
        this.paperService.getTotalAnswer(this.trainingId, row.paper.id).subscribe(
            allAnswer => {
                if (allAnswer > 0) {
                    this.router.navigate([row.paper.id, 'analysis'],
                        { relativeTo: this.route, queryParams: { assessId: row.id, offeringId: this.trainingId, assessType: 'ASSESS' } });
                } else {
                    tipMessage('暂无人员参与作答');
                }
            });
    }
}
