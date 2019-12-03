import { async, ComponentFixture, TestBed } from '@angular/core/testing';



import { UgcActivityWorkChapterComponent } from './ugc-activity-work-chapter.component';

describe('UgcActivityWorkChapterComponent', () => {
    let component: UgcActivityWorkChapterComponent;
    let fixture: ComponentFixture<UgcActivityWorkChapterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcActivityWorkChapterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcActivityWorkChapterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
