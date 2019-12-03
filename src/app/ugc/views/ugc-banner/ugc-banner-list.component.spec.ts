import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcBannerListComponent } from './ugc-banner-list.component';



describe('UgcBannerListComponent', () => {
    let component: UgcBannerListComponent;
    let fixture: ComponentFixture<UgcBannerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcBannerListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcBannerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
