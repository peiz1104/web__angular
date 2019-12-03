import { Component, OnInit, Input } from '@angular/core';
import { AssessService } from '../assess.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'spk-assess-detail',
  templateUrl: './assess-detail.component.html',
  styleUrls: ['./assess-detail.component.scss']
})
export class AssessDetailComponent implements OnInit {

  @Input() outSide?: string;
  @Input() paperId?: number; // 问卷id
  @Input() assessId?: number;
  constructor(
    private assessService: AssessService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.assessId) {
      this.route.params.subscribe(
        (params: Params) => {
          if (params['id']) {
            this.assessId = params['id'] as number;
          }
        });
    }
      this.outSide = this.outSide || 'TEMPLATE';
  }

  backList() {
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: {assessType: this.assessService.assessType} });
  }
}
