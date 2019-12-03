import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SurveyPaperService } from '../surveyPaper.service';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-paper-lookup',
  templateUrl: './paper-lookup.component.html',
  styleUrls: ['./paper-lookup.component.scss']
})
export class PaperLookupComponent implements OnInit {

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  papers: Survey[];
  pagination: CuiPagination;
  columns;
  searchtext;
  loading: boolean = true;

  constructor(private surveyPaperService: SurveyPaperService,
    private surveyService: SurveyService,
    private dialog: CuiLayer,
    private router: Router,
    private route: ActivatedRoute) {
    this.columns = [
      { title: 'ID', data: 'id', visible: true },
      { title: '问卷名称', data: 'name' }
    ];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: CuiPagination) {
    this.pagination = page;
    let params = {
      name: this.searchtext,
      type: 'SURVEY',
      page: page ? page.number : 0,
      size: page ? page.size : 10,
      sort: page && page.sort ? page.sort : ''
    };
    this.loading = true;
    this.surveyService.publishList(params).subscribe(
      pag => {
        this.pagination = pag;
        this.papers = pag.content;
        this.loading = false;
      }
    );
  }

  paperSelectionChange(papers) {
    this.selectionChange.emit(papers);
  }
}
