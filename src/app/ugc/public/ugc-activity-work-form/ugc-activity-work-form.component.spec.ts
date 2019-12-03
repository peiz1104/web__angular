import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityWorkFormComponent } from './ugc-activity-work-form.component';

describe('UgcActivityWorkFormComponent', () => {
    let component: UgcActivityWorkFormComponent;
    let fixture: ComponentFixture<UgcActivityWorkFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

