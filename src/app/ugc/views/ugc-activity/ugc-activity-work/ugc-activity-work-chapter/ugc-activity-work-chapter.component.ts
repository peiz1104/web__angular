import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivityWork } from '../../../../entity/ugc-activity-work';
import { UgcCourse } from '../../../../entity/ugc-course';

@Component({
    selector: 'spk-ugc-activity-work-chapter',
    templateUrl: './ugc-activity-work-chapter.component.html',
    styleUrls: ['./ugc-activity-work-chapter.component.scss']
})
export class UgcActivityWorkChapterComponent implements OnInit {

    ugcActivityWork: UgcActivityWork;
    editable: boolean;
    isCreate: boolean = false;
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { work: UgcActivityWork }) => {
            this.ugcActivityWork = data.work;
            this.ugcActivityWork.course =  new UgcCourse();
            this.ugcActivityWork.course.id = this.ugcActivityWork.courseId;
            this.ugcActivityWork.course.name = this.ugcActivityWork.courseName;
            this.ugcActivityWork.course.imageUrl = this.ugcActivityWork.courseImageUrl;
            this.ugcActivityWork.course.intro = this.ugcActivityWork.courseIntro;
            if (this.ugcActivityWork.sourceType == 'REFERENCED') {
                this.editable = false;
            }else {
                this.editable = true;
            }
        })
    }

}
