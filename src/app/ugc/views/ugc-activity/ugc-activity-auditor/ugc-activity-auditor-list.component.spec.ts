import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityAuditorListComponent } from './ugc-activity-auditor-list.component';



describe('UgcActivityAuditorListComponent', () => {
    let component: UgcActivityAuditorListComponent;
    let fixture: ComponentFixture<UgcActivityAuditorListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityAuditorListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityAuditorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
