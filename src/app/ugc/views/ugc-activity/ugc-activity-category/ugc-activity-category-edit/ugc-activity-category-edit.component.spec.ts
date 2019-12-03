import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityCategoryEditComponent } from './ugc-activity-category-edit.component';



describe('UgcActivityCategoryEditComponent', () => {
    let component: UgcActivityCategoryEditComponent;
    let fixture: ComponentFixture<UgcActivityCategoryEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityCategoryEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityCategoryEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
