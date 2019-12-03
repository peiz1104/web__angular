import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivityWork } from '../../../../entity/ugc-activity-work';

@Component({
    selector: 'spk-ugc-activity-work-detail',
    templateUrl: './ugc-activity-work-detail.component.html',
    styleUrls: ['./ugc-activity-work-detail.component.scss']
})
export class UgcActivityWorkDetailComponent implements OnInit {

    work: UgcActivityWork;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { work: UgcActivityWork }) => {
            this.work = data.work;
        })
    }

}
