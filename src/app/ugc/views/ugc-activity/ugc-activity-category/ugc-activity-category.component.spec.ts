import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityCategoryComponent } from './ugc-activity-category.component';



describe('UgcActivityCategoryComponent', () => {
    let component: UgcActivityCategoryComponent;
    let fixture: ComponentFixture<UgcActivityCategoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityCategoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
