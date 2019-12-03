import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClass } from './../../../entity/training-class';
import { TrainingClassApiService } from './../../../service/training-class-api.service';

@Component({
    selector: 'spk-training-class-notice-box',
    templateUrl: './training-class-notice-box.component.html',
    styleUrls: ['./training-class-notice-box.component.scss']
})
export class TrainingClassNoticeBoxComponent implements OnInit {

    trainingClass: TrainingClass;

    constructor(private router: Router, private route: ActivatedRoute,
        private trainingClassApiService: TrainingClassApiService) { }


    ngOnInit() {
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            this.trainingClass = data.trainingClass;
            this.trainingClass.noticeBox = {
                id: data.trainingClass.noticeBoxId,
                type: "SYSTEM"
            };


        });
    }

    afterBoxInited(event) {
        this.trainingClass.noticeBox = event;

        this.trainingClassApiService.save(this.trainingClass).subscribe(trainingClass => {
            console.log("组件初始成功");
        });
    }
}
