import { TrainingClass } from './../../../entity/training-class';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core';
@Component({
    selector: 'spk-training-class-newdetail',
    templateUrl: './training-class-newdetail.component.html',
    styleUrls: ['./training-class-newdetail.component.scss']
})
export class TrainingClassNewdetailComponent implements OnInit {
    trainingClass: TrainingClass;
    siteIdStatus: boolean = true;
    menuIsCollapsed;
    isCollapsed: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            this.trainingClass = data.trainingClass;
            if (this.trainingClass) {
                if (this.trainingClass.siteId) {
                    this.judgeSiteId(this.trainingClass.siteId)
                } else {
                    this.authService.getCurrentSite().subscribe(
                        site => {
                            this.judgeSiteId(site.id);
                        }
                    )
                }
            }
        });
    }
    // 判断站点id
    judgeSiteId(siteID) {
        if (siteID == 30) {
            this.siteIdStatus = true;
        } else {
            this.siteIdStatus = false;
        }
    }

}
