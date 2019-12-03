import { TrainingClass } from './../../../entity/training-class';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-training-class-condition',
    templateUrl: './training-class-condition.component.html',
    styleUrls: ['./training-class-condition.component.scss']
})
export class TrainingClassConditionComponent implements OnInit {

    trainingClass: TrainingClass;
    traingId: any;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params => {
                this.traingId = params.tbcId;
            }
        )
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            this.trainingClass = data.trainingClass;
        })
    }
    authorization(event) {
        // console.log(event, 334)
        this.router.navigate([`/training/class/${this.traingId}/authorizedregistration/registrationlist`])
    }


}
