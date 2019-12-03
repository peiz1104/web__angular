import { Forum } from './../../../../forum/ordinary-forum/entity/forum';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { TrainingClass } from '../../../entity/training-class';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-forum',
    templateUrl: './training-class-forum.component.html',
    styleUrls: ['./training-class-forum.component.scss']
})
export class TrainingClassForumComponent implements OnInit {

    trainingClass: TrainingClass;

    forum: Forum;

    constructor(
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(({ trainingClass }: { trainingClass: TrainingClass }) => {
            this.trainingClass = trainingClass;
        });
        this.forum = this.trainingClass.forum;
    }

    initCondition(param) {
        this.trainingClassApi.getForum(this.trainingClass.id).subscribe(
            ok => {
                this.forum = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

}
