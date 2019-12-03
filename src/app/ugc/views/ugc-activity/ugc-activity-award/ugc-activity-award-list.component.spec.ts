import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityAwardListComponent } from './ugc-activity-award-list.component';



describe('UgcActivityAwardListComponent', () => {
    let component: UgcActivityAwardListComponent;
    let fixture: ComponentFixture<UgcActivityAwardListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityAwardListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityAwardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
