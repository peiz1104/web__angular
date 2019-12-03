import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityConditionListComponent } from './ugc-activity-condition-list.component';



describe('UgcActivityConditionListComponent', () => {
    let component: UgcActivityConditionListComponent;
    let fixture: ComponentFixture<UgcActivityConditionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityConditionListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityConditionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
