import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spk-teacher-information-list',
    templateUrl: './teacher-information-list.component.html',
    styleUrls: ['./teacher-information-list.component.scss']
})
export class TeacherInformationListComponent implements OnInit {
    @Input() teacherId;
    @Input() rank;
    currentIndexTable: number = 0;
    constructor() { }

    ngOnInit() {
    }
    changetabselect(event) {
        this.currentIndexTable = event.index;
    }
}
