import { Assess } from './../../../../assess/assess.model';

import { Paper } from './../../../../assess/paper.model';
import { PaperService } from './../../../../assess/paper.service';
import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-train-class-assessment',
    templateUrl: './train-class-assessment.component.html',
    styleUrls: ['./train-class-assessment.component.scss']
})
export class TrainClassAssessmentComponent implements OnInit {
    trainingId: number;

    papers: Assess[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;
    isVisible: boolean = false;
    paperId: number;

    allPapers: Paper[];
    isShowSourse: boolean = false; // 资源库
    sourseColumns;
    sourseSelected: any;
    sourseText;

    constructor(private paperService: PaperService,
        private dialog: CuiLayer,
        private router: Router,
        private route: ActivatedRoute) {
        this.columns = [
            { title: 'ID', data: 'id', visible: true, styleClass: 'text-center' },
            { title: '评估名称', data: 'name', styleClass: 'text-center' },
            { title: '状态', data: 'status', tpl: 'statusTpl', styleClass: 'text-center' }
        ];
        this.sourseColumns = [
            { title: 'ID', data: 'id', visible: true, styleClass: 'text-center' },
            { title: '调查名称', data: 'name', styleClass: 'text-center' },
            { title: '描述', data: 'description', styleClass: 'text-center' }
        ];
    }
    ngOnInit() {
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingId = obj.trainingClass.id;
            }
        );
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : '',
            type: "TRAINING"
        };
        this.loading = true;
        this.paperService.trainList(this.trainingId, params).subscribe(
            pag => {
                this.pagination = pag;
                this.papers = pag.content;
                this.loading = false;
            }
        );
    }

    delete(id) {
        let params = {
            offeringId: this.trainingId,
            ids: [id]
        }
        this.dialog.confirm('确认要删除吗？',
            () => {
                this.paperService.trainDelete(params).subscribe(
                    () => {
                        this.dialog.msg('删除成功');
                        this.loadData();
                    },
                    err => { this.dialog.confirm(err) }
                );
            }
        );
    }

    onPublish(paper) {
        paper.type = "TRAINING";
        paper.status = (paper.status == 'DRAFT' ? 'RUNNING' : 'DRAFT');
        paper.lastModifiedDate = null;
        this.paperService.edit(paper).subscribe(
            papers => {
                this.dialog.msg('保存成功');
                this.loadData();
            }
        );
    }

    showModal(id?: number) {
        this.paperId = id;
        this.isVisible = true;
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
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : '',
        };
        this.loading = true;
        this.paperService.publishList(params).subscribe(
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
        if (this.sourseSelected) {
            this.paperService.copySourse(this.trainingId, this.sourseSelected).subscribe(
                ok => {
                    this.isShowSourse = false;
                    this.searchtext = '';
                    this.loadData();
                }
            )
        } else {
            this.dialog.msg('请至少选择一个评估');
        }
    }
}

