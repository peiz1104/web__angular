import { AnnualPlan } from './../../entity/annualplan';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'spk-annualplan-form',
    templateUrl: './annualplan-form.component.html',
    styleUrls: ['./annualplan-form.component.scss']
})
export class AnnualplanFormComponent implements OnInit {

    @Input() annualPlan: AnnualPlan;
    @Output() doSubmit: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    years: number[];
    constructor() {

    }

    ngOnInit() {
        let year = new Date().getFullYear();
        this.years = [year, year + 1., year + 2];
    }

    onSubmit(e) {
        this.doSubmit.emit({ originEvent: e, annualPlan: this.annualPlan });
    }
    doCancel(event) {
        this.cancel.emit({ originEvent: event });
    }


}


