import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityVoteEditComponent } from './ugc-activity-vote-edit.component';



describe('UgcActivityVoteEditComponent', () => {
    let component: UgcActivityVoteEditComponent;
    let fixture: ComponentFixture<UgcActivityVoteEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityVoteEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityVoteEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
