import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseAddComponent } from './ugc-example-course-add.component';


describe('UgcExampleCourseAddComponent', () => {
    let component: UgcExampleCourseAddComponent;
    let fixture: ComponentFixture<UgcExampleCourseAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseAddComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
