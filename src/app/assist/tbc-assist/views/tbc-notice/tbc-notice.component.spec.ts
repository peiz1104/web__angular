import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcNoticeComponent } from './tbc-notice.component';

describe('TbcNoticeComponent', () => {
  let component: TbcNoticeComponent;
  let fixture: ComponentFixture<TbcNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
