import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjcetNoticeBoxListComponent } from './subject-notice-box-list.component';


describe('SubjcetNoticeBoxListComponent', () => {
    let component: SubjcetNoticeBoxListComponent;
    let fixture: ComponentFixture<SubjcetNoticeBoxListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubjcetNoticeBoxListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubjcetNoticeBoxListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
