import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-declare-period',
    templateUrl: './declare-period.component.html',
    styleUrls: ['./declare-period.component.scss']
})
export class DeclarePeriodComponent implements OnInit {

    tabIndex: any = 0;
    constructor() { }

    ngOnInit() {
    }
    changetabselect(event) {
        this.tabIndex = event.index;
    }
}
