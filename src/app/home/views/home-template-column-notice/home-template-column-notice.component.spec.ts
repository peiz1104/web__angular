import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnNoticeComponent } from './home-template-column-notice.component';

describe('HomeTemplateColumnNoticeComponent', () => {
  let component: HomeTemplateColumnNoticeComponent;
  let fixture: ComponentFixture<HomeTemplateColumnNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
