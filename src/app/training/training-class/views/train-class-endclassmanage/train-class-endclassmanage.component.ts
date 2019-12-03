import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';


@Component({
    selector: 'spk-train-class-endclassmanage',
    templateUrl: './train-class-endclassmanage.component.html',
    styleUrls: ['./train-class-endclassmanage.component.scss']
})
export class TrainClassEndclassmanageComponent implements OnInit {
    tabIndex: number = 0;
    traingId: any;

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this.routeInfo.parent.params.subscribe(
            params => {
                this.traingId = params.tbcId;
                console.log(this.traingId)
            }
        )
    }
    changetabselect(event) {
        // console.log(event, 223)
        this.tabIndex = event.index;
    }

}
