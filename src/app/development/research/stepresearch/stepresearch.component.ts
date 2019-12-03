import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-stepresearch',
    templateUrl: './stepresearch.component.html',
    styleUrls: ['./stepresearch.component.scss']
})
export class StepresearchComponent implements OnInit {
    devId: any;
    phaseId: any;
    tableIndex: number = 0;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,

    ) { }

    ngOnInit() {
        this.routeInfo.paramMap.subscribe(
            params => {
                this.devId = params.get('id');
                this.phaseId = params.get('stepId');
            }
        )
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 改变table
    changetable(event) {
        this.tableIndex = event.index;
    }

}
