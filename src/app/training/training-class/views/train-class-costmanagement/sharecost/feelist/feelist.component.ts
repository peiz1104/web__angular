import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router'
import { TrainingClassApiService } from './../../../../../service/training-class-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-feelist',
    templateUrl: './feelist.component.html',
    styleUrls: ['./feelist.component.scss']
})
export class FeelistComponent implements OnInit {
    feeListData: any[] = [];
    spinning: boolean = false;
    trainDetail: any;

    constructor(
        private message: NzMessageService,
        private service: TrainingClassApiService,
        private router: Router,
        private routeInfo: ActivatedRoute
    ) { }

    ngOnInit() {
        this.routeInfo.data.subscribe(
            (obj: { target }) => {
                this.trainDetail = obj.target;
            }
        )
        // console.log(this.trainDetail, 123)
        this.service.getfeeviewlist(this.trainDetail.id).subscribe(
            res => {
                this.feeListData = res;
                // console.log(res, 444)
            },
            err => {
                tipMessage(err);
            }
        )
    }


}
