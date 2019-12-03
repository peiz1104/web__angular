import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityExcellentListComponent } from './ugc-activity-excellent-list.component';



describe('UgcActivityExcellentListComponent', () => {
    let component: UgcActivityExcellentListComponent;
    let fixture: ComponentFixture<UgcActivityExcellentListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityExcellentListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityExcellentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
