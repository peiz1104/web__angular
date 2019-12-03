import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityVoteListComponent } from './ugc-activity-vote-list.component';



describe('UgcActivityVoteListComponent', () => {
    let component: UgcActivityVoteListComponent;
    let fixture: ComponentFixture<UgcActivityVoteListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityVoteListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityVoteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
