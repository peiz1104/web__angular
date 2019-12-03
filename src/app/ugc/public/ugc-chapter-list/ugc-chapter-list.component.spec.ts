import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UgcChapterListComponent } from './ugc-chapter-list.component';



describe('UgcChapterListComponent', () => {
    let component: UgcChapterListComponent;
    let fixture: ComponentFixture<UgcChapterListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UgcChapterListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UgcChapterListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
