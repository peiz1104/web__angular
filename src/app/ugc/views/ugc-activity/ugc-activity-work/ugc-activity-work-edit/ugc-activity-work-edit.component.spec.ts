import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityWorkEditComponent } from './ugc-activity-work-edit.component';


describe('UgcActivityWorkEditComponent', () => {
    let component: UgcActivityWorkEditComponent;
    let fixture: ComponentFixture<UgcActivityWorkEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
