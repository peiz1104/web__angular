import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-classroom-detail',
    templateUrl: './classroom-detail.component.html',
    styleUrls: ['./classroom-detail.component.scss']
})
export class ClassroomDetailComponent implements OnInit {
    menuIsCollapsed = false;
    constructor() { }

    ngOnInit() {
    }
    changeMenuwidth = (value) => {
        this.menuIsCollapsed = !this.changeMenuwidth;
    }
}
