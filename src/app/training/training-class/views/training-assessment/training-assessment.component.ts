import { Component, OnInit } from '@angular/core';
import { Assess } from 'app/assess/assess.model';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClassApiService } from 'app/training/service/training-class-api.service';

@Component({
    selector: 'spk-training-assessment',
    templateUrl: './training-assessment.component.html',
    styleUrls: ['./training-assessment.component.scss']
})

export class TrainingAssessmentComponent implements OnInit {

    papers: Assess[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;
    isVisible: boolean = false;

    constructor(private trainingClassApiService: TrainingClassApiService,
        private dialog: CuiLayer,
        private router: Router,
        private route: ActivatedRoute) {
        this.columns = [
            { title: 'ID', data: 'id', visible: true },
            { title: '评估名称', data: 'name' },
            { title: '开始时间', data: 'startDate' },
            { title: '结束时间', data: 'endDate' },
            { title: '状态', data: 'status', tpl: 'statusTpl' }
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.trainingClassApiService.getAssessList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.papers = pag.content;
                this.papers.forEach(p => {
                    if (p.startDate) {
                        p.startDate = p.startDate.substring(0, 10);
                        p.endDate = p.endDate.substring(0, 10);
                    }
                });
                this.loading = false;
            }
        );
    }

    add(id?: number) {
        this.isVisible = true;
    }
    delete(id) {
    }

    onPublish(assess) {
    }

    handleCancel() {
        this.isVisible = false;
    }

}

