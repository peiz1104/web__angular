import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityListComponent } from './ugc-activity-list.component';



describe('UgcActivityListComponent', () => {
    let component: UgcActivityListComponent;
    let fixture: ComponentFixture<UgcActivityListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
