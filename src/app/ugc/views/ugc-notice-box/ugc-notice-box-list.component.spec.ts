import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcNoticeBoxListComponent } from './ugc-notice-box-list.component';



describe('UgcNoticeBoxListComponent', () => {
    let component: UgcNoticeBoxListComponent;
    let fixture: ComponentFixture<UgcNoticeBoxListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcNoticeBoxListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcNoticeBoxListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
