import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-train-class-costmanagement',
    templateUrl: './train-class-costmanagement.component.html',
    styleUrls: ['./train-class-costmanagement.component.scss']
})
export class TrainClassCostmanagementComponent implements OnInit {
    currentIndexTable = 0;
    candostatus: boolean;
    constructor() { }

    ngOnInit() {
    }
    // 审核通过时方可对分摊费用，本级交通费，下级交通费进行编辑
    judgecando(value) {
        // console.log(value, '判断是否可以操作');
        this.candostatus = value.res.trainBaseFeeStatus == 'N' ? false : true;
    }
    // 切换tab
    changetabselect(event) {
        // console.log(event)
        this.currentIndexTable = event.index;

    }
}
