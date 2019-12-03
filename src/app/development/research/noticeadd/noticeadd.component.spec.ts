import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeaddComponent } from './noticeadd.component';

describe('NoticeaddComponent', () => {
  let component: NoticeaddComponent;
  let fixture: ComponentFixture<NoticeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
