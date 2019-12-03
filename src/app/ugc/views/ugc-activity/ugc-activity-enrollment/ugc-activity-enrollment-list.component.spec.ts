import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityEnrollmentListComponent } from './ugc-activity-enrollment-list.component';



describe('UgcActivityEnrollmentListComponent', () => {
    let component: UgcActivityEnrollmentListComponent;
    let fixture: ComponentFixture<UgcActivityEnrollmentListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityEnrollmentListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityEnrollmentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
