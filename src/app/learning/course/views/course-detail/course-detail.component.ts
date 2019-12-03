import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
    menuIsCollapsed = false;
    course: any;
    constructor(
        private routeInfo: ActivatedRoute
    ) { }

    ngOnInit() {
        this.routeInfo.data.subscribe((data: { course }) => {
            this.course = data.course;
        })
        // console.log(this.course, 24)
    }
    changeMenuwidth = (event) => {
        // console.log(event, 11)
        this.menuIsCollapsed = !this.menuIsCollapsed;
    }
}
