import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityExpertListComponent } from './ugc-activity-expert-list.component';



describe('UgcActivityExpertListComponent', () => {
    let component: UgcActivityExpertListComponent;
    let fixture: ComponentFixture<UgcActivityExpertListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityExpertListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityExpertListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
