import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UgcExampleCourse } from '../../../entity/ugc-example-course';

@Component({
    selector: 'spk-ugc-example-course-info',
    templateUrl: './ugc-example-course-info.component.html',
    styleUrls: ['./ugc-example-course-info.component.scss']
})
export class UgcExampleCourseInfoComponent implements OnInit {

    ugcExampleCourse: UgcExampleCourse;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcExampleCourse: UgcExampleCourse }) => {
            this.ugcExampleCourse = data.ugcExampleCourse;
        });
    }

}
