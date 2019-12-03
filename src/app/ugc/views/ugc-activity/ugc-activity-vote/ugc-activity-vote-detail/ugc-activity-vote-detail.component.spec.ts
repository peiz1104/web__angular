import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityVoteDetailComponent } from './ugc-activity-vote-detail.component';



describe('UgcActivityVoteDetailComponent', () => {
    let component: UgcActivityVoteDetailComponent;
    let fixture: ComponentFixture<UgcActivityVoteDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityVoteDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityVoteDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
