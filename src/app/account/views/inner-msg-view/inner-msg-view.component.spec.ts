import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerMsgViewComponent } from './inner-msg-view.component';

describe('InnerMsgViewComponent', () => {
  let component: InnerMsgViewComponent;
  let fixture: ComponentFixture<InnerMsgViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerMsgViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerMsgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
