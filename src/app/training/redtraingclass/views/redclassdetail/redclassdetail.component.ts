/*
 * @Author: peimingjun
 * @Date: 2018-03-22 14:38:38
 * @Last Modified by:   peimingjun
 * @Last Modified time: 2018-03-22 14:38:38
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-redclassdetail',
    templateUrl: './redclassdetail.component.html',
    styleUrls: ['./redclassdetail.component.scss']
})
export class RedclassdetailComponent implements OnInit {
    menuIsCollapsed
    isCollapsed: boolean = false;
    constructor() { }

    ngOnInit() {
    }
    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
