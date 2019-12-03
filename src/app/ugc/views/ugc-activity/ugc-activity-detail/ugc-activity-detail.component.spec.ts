import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityDetailComponent } from './ugc-activity-detail.component';



describe('UgcActivityDetailComponent', () => {
    let component: UgcActivityDetailComponent;
    let fixture: ComponentFixture<UgcActivityDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
