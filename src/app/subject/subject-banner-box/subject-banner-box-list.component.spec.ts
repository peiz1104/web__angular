import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjcetBannerBoxListComponent } from './subject-banner-box-list.component';


describe('SubjcetBannerBoxListComponent', () => {
    let component: SubjcetBannerBoxListComponent;
    let fixture: ComponentFixture<SubjcetBannerBoxListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubjcetBannerBoxListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubjcetBannerBoxListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
