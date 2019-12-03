import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNoticeBoxComponent } from './system-notice-box.component';

describe('SystemNoticeBoxComponent', () => {
  let component: SystemNoticeBoxComponent;
  let fixture: ComponentFixture<SystemNoticeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNoticeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNoticeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
