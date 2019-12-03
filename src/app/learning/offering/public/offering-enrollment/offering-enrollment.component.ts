import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spk-offering-enrollment',
    templateUrl: './offering-enrollment.component.html',
    styleUrls: ['./offering-enrollment.component.scss']
})
export class OfferingEnrollmentComponent implements OnInit {

    @Input() offering: any;

    _enrollStatus = [
        { label: '已注册', value: '' },
        // { label: '已进入等待列表', value: '' },
        { label: '未注册', value: '' },
        { label: '待审核', value: '' },
        { label: '已拒绝', value: '' },
    ];

    constructor() { }

    ngOnInit() {
    }

    _tabChange(event) {
        // console.log(event);
    }

}
