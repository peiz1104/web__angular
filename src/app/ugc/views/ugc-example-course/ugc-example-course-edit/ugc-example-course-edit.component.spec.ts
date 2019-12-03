import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcExampleCourseEditComponent } from './ugc-example-course-edit.component';


describe('UgcExampleCourseEditComponent', () => {
    let component: UgcExampleCourseEditComponent;
    let fixture: ComponentFixture<UgcExampleCourseEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcExampleCourseEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcExampleCourseEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
