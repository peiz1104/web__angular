import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivity } from '../../../../entity/ugc-activity';

@Component({
    selector: 'spk-ugc-activity-vote-detail',
    templateUrl: './ugc-activity-vote-detail.component.html',
    styleUrls: ['./ugc-activity-vote-detail.component.scss']
})
export class UgcActivityVoteDetailComponent implements OnInit {

    ugcActivity: UgcActivity;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
        })
    }

}
