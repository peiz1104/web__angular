import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcExampleCourse } from '../../../entity/ugc-example-course';

@Component({
    selector: 'spk-ugc-example-course-detail',
    templateUrl: './ugc-example-course-detail.component.html',
    styleUrls: ['./ugc-example-course-detail.component.scss']
})
export class UgcExampleCourseDetailComponent implements OnInit {

    ugcExampleCourse: UgcExampleCourse;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        // this.route.data.subscribe((data: { ugcExampleCourse: UgcExampleCourse }) => {
        //     this.ugcExampleCourse = data.ugcExampleCourse;
        // })
    }

}
