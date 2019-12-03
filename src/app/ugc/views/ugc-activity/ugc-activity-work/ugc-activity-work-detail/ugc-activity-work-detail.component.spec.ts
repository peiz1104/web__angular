import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityWorkDetailComponent } from './ugc-activity-work-detail.component';


describe('UgcActivityWorkDetailComponent', () => {
    let component: UgcActivityWorkDetailComponent;
    let fixture: ComponentFixture<UgcActivityWorkDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
