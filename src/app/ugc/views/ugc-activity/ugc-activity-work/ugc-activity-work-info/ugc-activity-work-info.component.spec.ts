import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityWorkInfoComponent } from './ugc-activity-work-info.component';


describe('UgcActivityWorkInfoComponent', () => {
    let component: UgcActivityWorkInfoComponent;
    let fixture: ComponentFixture<UgcActivityWorkInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
