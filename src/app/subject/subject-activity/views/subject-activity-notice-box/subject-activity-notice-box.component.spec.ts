import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjcetActivityNoticeBoxComponent } from './subject-activity-notice-box.component';

describe('SubjcetActivityNoticeBoxComponent', () => {
  let component: SubjcetActivityNoticeBoxComponent;
  let fixture: ComponentFixture<SubjcetActivityNoticeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjcetActivityNoticeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjcetActivityNoticeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
