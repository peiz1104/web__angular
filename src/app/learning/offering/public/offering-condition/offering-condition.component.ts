import { OfferingService } from './../../service/offering.service';
import { Offering } from './../../entity/offering';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spk-offering-condition',
    templateUrl: './offering-condition.component.html',
    styleUrls: ['./offering-condition.component.scss']
})
export class OfferingConditionComponent implements OnInit {
    @Input() offering: Offering;
    @Input() conditionTypes: any[] = ['required', 'open', 'closed'];
    @Input() promotionState: any;

    err;
    isArchived: boolean = false;
    constructor(private offeringService: OfferingService) { }

    ngOnInit() {
        // console.log(this.offering, 555);
        if (this.offering) {
            this.isArchived = this.offering.isArchived;
        }
    }

    initCondition(type: 'required' | 'open' | 'closed') {
        this.offeringService.addCondition(this.offering.id, type).subscribe(
            condition => {
                if (condition) {
                    if (type == 'required') {
                        this.offering.requiredCondition = condition;
                    }
                    if (type == 'open') {
                        this.offering.openCondition = condition;
                    }
                    if (type == 'closed') {
                        this.offering.closedCondition = condition;
                    }
                } else {
                    this.err = '初始化注册条件失败';
                }
            },
            err => this.err = err
        );
    }

    hasType(type: 'required' | 'open' | 'closed') {
        return this.conditionTypes && this.conditionTypes.some(it => it == type);
    }

    getOnlyType() {
        if (this.conditionTypes && this.conditionTypes.length == 1) {
            return this.conditionTypes[0];
        }
    }

    getCondition(type: 'required' | 'open' | 'closed') {
        switch (type) {
            case 'required':
                return this.offering.requiredCondition;
            case 'open':
                return this.offering.openCondition;
            case 'closed':
                return this.offering.closedCondition;
            default:
                break;
        }
    }
}
