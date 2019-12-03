import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityAddComponent } from './ugc-activity-add.component';



describe('UgcActivityAddComponent', () => {
    let component: UgcActivityAddComponent;
    let fixture: ComponentFixture<UgcActivityAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityAddComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
