import { SurveyPaperService } from './../../../../survey/surveyPaper.service';
import { SubjectActivity } from './../../../entity/subject-activity';
import { Survey } from './../../../../survey/survey.model';
import { SurveyService } from 'app/survey/survey.service';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SurveyTplService } from '../../../../survey/survey-tpl.service';

@Component({
  selector: 'spk-subject-activity-survey',
  templateUrl: './subject-activity-survey.component.html',
  styleUrls: ['./subject-activity-survey.component.scss']
})
export class SubjectActivitySurveyComponent implements OnInit {

  subjectId: number;
  subjectName: string;

  papers: Survey[];
  pagination: CuiPagination;
  columns;
  searchtext;
  loading: boolean = true;
  isVisible: boolean = false;
  paperId: number;
  surveyId: number;
  showEdie: boolean = false;

  allPapers: Survey[];
  isShowSourse: boolean = false; // 资源库
  sourseColumns;
  sourseSelected: any;
  sourseText;
  bLoading: boolean = false;

  constructor(private surveyService: SurveyService,
    private surveyPaperService: SurveyPaperService,
    private surveyTplApi: SurveyTplService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService,
    private route: ActivatedRoute) {
    this.columns = [
      { title: '调查名称', data: 'name' },
      // { title: '描述', data: 'description' },
      { title: '开始时间', tpl: 'start-date' },
      { title: '结束时间', tpl: 'end-date' },
      { title: '状态', data: 'status', tpl: 'statusTpl'}
    ];
    this.sourseColumns = [
      { title: '调查名称', data: 'name' },
      // { title: '描述', data: 'description' }
    ];

  }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subjectId = subjectActivity.id;
      this.subjectName = subjectActivity.name;
    });
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
    this.surveyService.trainList(this.subjectId, params).subscribe(
      pag => {
        this.pagination = pag;
        this.papers = pag.content;
        this.loading = false;
      }
    );
  }

  delete(row) {
    if (!row.isPublished) {
      this.surveyService.trainDelete(this.subjectId, row.id).subscribe(
        () => {
          this.message.success('删除成功');
          this.loadData();
        },
        err => { this.message.error(err) }
      );
/*       this.modal.confirm({
        title: `确定要删除吗？`,
        onOk: () => {
        }
      }); */
    } else {
      this.message.warning('发布状态下不允许删除');
    }
  }

  onPublish(survey) {
    this.surveyPaperService.confirmPublish(survey.paper.id).subscribe(
      data => {
        if (data.length > 0) {
          this.surveyPaperService.publishSurvey([survey.id]).subscribe(
            papers => {
              this.message.success('发布成功');
              this.loadData();
            }
          );
        } else {
          this.message.warning("问卷信息不完善，不能发布");
          this.loadData();
        }
      }
    );
  }

  onDisPublish(survey) {
      this.surveyPaperService.disPublishSurvey([survey.id]).subscribe(
        papers => {
          this.message.success('取消发布成功');
          this.loadData();
        }
      );
  }

  showModal(row?: any) {
    this.isVisible = true;
    if (row) {
      this.paperId = row.paper.id;
      this.surveyId = row.id;
      this.showEdie = true;
    } else {
      this.paperId = null;
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
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: page && page.sort ? page.sort : '',
    };
    this.loading = true;
    this.surveyTplApi.lookup(params).subscribe(
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
      this.surveyService.copySourse(this.subjectId, this.sourseSelected).subscribe(
        ok => {
          this.bLoading = false;
          this.isShowSourse = false;
          this.searchtext = '';
          this.loadData();
        }
      );
    } else {
      this.bLoading = false;
      this.message.warning('请至少选择一个调查');
    }
  }

  toAnalysis(row) {
    // 判断是否有作答记录
    this.surveyService.getTotalAnswer(this.subjectId, row.paper.id).subscribe(
      allAnswer => {
        if (allAnswer > 0) {
          this.router.navigate([row.paper.id, 'analysis'],
           { relativeTo: this.route, queryParams: {assessId: row.id, offeringId: this.subjectId, assessType: 'SURVEY'}});
        } else {
          this.message.warning('暂无人员参与作答');
        }
      });
  }
}
