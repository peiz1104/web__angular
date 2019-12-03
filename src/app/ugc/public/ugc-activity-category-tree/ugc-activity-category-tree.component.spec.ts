import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { UgcActivityCategoryTreeComponent } from './ugc-activity-category-tree.component';

describe('UgcActivityCategoryTreeComponent', () => {
    let component: UgcActivityCategoryTreeComponent;
    let fixture: ComponentFixture<UgcActivityCategoryTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityCategoryTreeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityCategoryTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
