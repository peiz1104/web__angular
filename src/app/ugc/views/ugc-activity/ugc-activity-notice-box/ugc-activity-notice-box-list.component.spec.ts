import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityNoticeBoxListComponent } from './ugc-activity-notice-box-list.component';



describe('UgcActivityNoticeBoxListComponent', () => {
    let component: UgcActivityNoticeBoxListComponent;
    let fixture: ComponentFixture<UgcActivityNoticeBoxListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityNoticeBoxListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityNoticeBoxListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
