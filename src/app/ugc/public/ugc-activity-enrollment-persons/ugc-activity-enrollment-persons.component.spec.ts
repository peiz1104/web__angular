import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityEnrollmentPersonsComponent } from './ugc-activity-enrollment-persons.component';



describe('UgcActivityEnrollmentPersonsComponent', () => {
    let component: UgcActivityEnrollmentPersonsComponent;
    let fixture: ComponentFixture<UgcActivityEnrollmentPersonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityEnrollmentPersonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityEnrollmentPersonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
