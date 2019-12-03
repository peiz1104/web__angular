import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityEditComponent } from './ugc-activity-edit.component';



describe('UgcActivityEditComponent', () => {
    let component: UgcActivityEditComponent;
    let fixture: ComponentFixture<UgcActivityEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
