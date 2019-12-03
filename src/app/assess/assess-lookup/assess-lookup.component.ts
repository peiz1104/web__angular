import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssessService } from '../assess.service';
import { PaperService } from '../paper.service';
import { Paper } from '../paper.model';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-assess-lookup',
  templateUrl: './assess-lookup.component.html',
  styleUrls: ['./assess-lookup.component.scss']
})
export class AssessLookupComponent implements OnInit {

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  papers: Paper[];
  pagination: CuiPagination;
  columns;
  searchtext;
  loading: boolean = true;

  constructor(private assessService: AssessService,
    private paperService: PaperService,
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
      page: page ? page.number : 0,
      size: page ? page.size : 10,
      sort: page && page.sort ? page.sort : ''
    };
    this.loading = true;
    this.paperService.publishList(params).subscribe(
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
