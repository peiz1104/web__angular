import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseChapterComponent } from './ugc-example-course-chapter.component';


describe('UgcExampleCourseChapterComponent', () => {
    let component: UgcExampleCourseChapterComponent;
    let fixture: ComponentFixture<UgcExampleCourseChapterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseChapterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseChapterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
