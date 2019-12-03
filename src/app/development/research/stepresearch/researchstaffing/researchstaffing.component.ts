import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-researchstaffing',
    templateUrl: './researchstaffing.component.html',
    styleUrls: ['./researchstaffing.component.scss']
})
export class ResearchstaffingComponent implements OnInit {
    @Input() id: any;
    @Input() phaseId: any;
    devStatus: any;
    tableIndex: any = 0;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.routeInfo.queryParams.subscribe(
            params => {
                this.devStatus = params.status;
            }
        )
    }
    changetable($event) {
        this.tableIndex = $event.index;
    }
}
