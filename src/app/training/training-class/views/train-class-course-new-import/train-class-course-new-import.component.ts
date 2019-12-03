import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-train-class-course-new-import',
    templateUrl: './train-class-course-new-import.component.html',
    styleUrls: ['./train-class-course-new-import.component.scss']
})
export class TrainClassCourseNewImportComponent implements OnInit {
    tableIndex: number = 0;
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute
    ) { }

    ngOnInit() {
    }
    changeTable(event) {
        this.tableIndex = event.index;
    }
    goback() {
        window.localStorage.removeItem('importArray');
        this.router.navigate(['../'], { relativeTo: this.routeInfo })
    }

}
