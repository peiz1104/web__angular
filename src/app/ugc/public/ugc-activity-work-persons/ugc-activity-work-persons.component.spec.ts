import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityWorkPersonsComponent } from './ugc-activity-work-persons.component';



describe('UgcActivityWorkPersonsComponent', () => {
    let component: UgcActivityWorkPersonsComponent;
    let fixture: ComponentFixture<UgcActivityWorkPersonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkPersonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkPersonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
