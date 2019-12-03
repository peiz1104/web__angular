import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcActivityVoteInfoModule } from './ugc-activity-vote-info.module';



describe('UgcActivityVoteInfoModule', () => {
    let component: UgcActivityVoteInfoModule;
    let fixture: ComponentFixture<UgcActivityVoteInfoModule>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityVoteInfoModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityVoteInfoModule);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
