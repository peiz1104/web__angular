import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityWorkListComponent } from './ugc-activity-work-list.component';


describe('UgcActivityWorkListComponent', () => {
    let component: UgcActivityWorkListComponent;
    let fixture: ComponentFixture<UgcActivityWorkListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkListComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
