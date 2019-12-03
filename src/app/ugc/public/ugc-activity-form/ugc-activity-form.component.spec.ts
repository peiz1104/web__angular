import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityFormComponent } from './ugc-activity-form.component';

describe('UgcActivityFormComponent', () => {
    let component: UgcActivityFormComponent;
    let fixture: ComponentFixture<UgcActivityFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

