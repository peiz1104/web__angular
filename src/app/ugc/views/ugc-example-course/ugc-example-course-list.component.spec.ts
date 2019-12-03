import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseListComponent } from './ugc-example-course-list.component';



describe('UgcExampleCourseListComponent', () => {
    let component: UgcExampleCourseListComponent;
    let fixture: ComponentFixture<UgcExampleCourseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
