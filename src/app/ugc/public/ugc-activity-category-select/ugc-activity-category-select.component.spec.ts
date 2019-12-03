import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityCategorySelectComponent } from './ugc-activity-category-select.component';

describe('UgcActivityCategorySelectComponent', () => {
    let component: UgcActivityCategorySelectComponent;
    let fixture: ComponentFixture<UgcActivityCategorySelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityCategorySelectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityCategorySelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
