import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityCategoryListComponent } from './ugc-activity-category-list.component';



describe('UgcActivityCategoryListComponent', () => {
    let component: UgcActivityCategoryListComponent;
    let fixture: ComponentFixture<UgcActivityCategoryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityCategoryListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityCategoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
