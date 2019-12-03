import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityVoteOptionListComponent } from './ugc-activity-vote-option-list.component';



describe('UgcActivityVoteOptionListComponent', () => {
    let component: UgcActivityVoteOptionListComponent;
    let fixture: ComponentFixture<UgcActivityVoteOptionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityVoteOptionListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityVoteOptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
