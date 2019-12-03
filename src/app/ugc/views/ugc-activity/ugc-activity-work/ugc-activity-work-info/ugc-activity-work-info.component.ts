import { ActivatedRoute, UrlSegment } from '@angular/router';
import { UgcActivityWork } from '../../../../entity/ugc-activity-work';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-ugc-activity-work-info',
  templateUrl: './ugc-activity-work-info.component.html',
  styleUrls: ['./ugc-activity-work-info.component.scss']
})
export class UgcActivityWorkInfoComponent implements OnInit {

   work: UgcActivityWork;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {work: UgcActivityWork}) => {
      this.work = data.work;
    });
  }

}
