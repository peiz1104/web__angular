import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseInfoComponent } from './ugc-example-course-info.component';


describe('UgcExampleCourseInfoComponent', () => {
    let component: UgcExampleCourseInfoComponent;
    let fixture: ComponentFixture<UgcExampleCourseInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
