import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { UgcChapter } from '../../entity/ugc-chapter';
import { UgcCourse } from '../../entity/ugc-course';
import { UgcChapterService } from '../../service/ugc-chapter.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'spk-ugc-chapter-list',
    templateUrl: './ugc-chapter-list.component.html',
    styleUrls: ['./ugc-chapter-list.component.scss']
})
export class UgcChapterListComponent implements OnInit {
    @Input() course: UgcCourse;
    @Input() isCreate: boolean = false;
    @Input() actionsViewRef: TemplateRef<any>;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() editable: boolean = false;
    msg: Message[];
    rootChapter: UgcChapter;
    chapterIndex: UgcChapter[];
    loading: boolean = false;


    constructor(private chapterService: UgcChapterService,
           private router: Router,
    private route: ActivatedRoute
       ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { course: UgcCourse }) => {
            this.course = this.course ? this.course : data.course;
            this.loadUgcChapterIndex();
        });
    }

    loadUgcChapterIndex() {
        if (!this.course || !this.course.id ) {
            return;
        }

        this.loading = true;
        this.chapterService.getAllChapter(this.course.id).subscribe(
            ugcChapters => {
                this.chapterIndex = ugcChapters;
                this.loading = false;
                this.addRootUgcChapter(ugcChapters);
            },
            err => {
                this.loading = false;
            }
        );
    }

    addRootUgcChapter(ugcChapters) {
        this.rootChapter = new UgcChapter();
        this.rootChapter.children = ugcChapters;
        this.rootChapter.contentType = "COURSE";
        this.rootChapter.title = this.course.name;
    }




    _save(event) {
        this.save.emit({ originalEvent: event});
    }



}
