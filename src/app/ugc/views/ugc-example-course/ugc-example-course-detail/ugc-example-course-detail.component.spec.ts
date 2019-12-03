import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseDetailComponent } from './ugc-example-course-detail.component';


describe('UgcExampleCourseDetailComponent', () => {
    let component: UgcExampleCourseDetailComponent;
    let fixture: ComponentFixture<UgcExampleCourseDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
