import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcChapterItemComponent } from './ugc-chapter-item.component';



describe('UgcChapterItemComponent', () => {
    let component: UgcChapterItemComponent;
    let fixture: ComponentFixture<UgcChapterItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcChapterItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcChapterItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
