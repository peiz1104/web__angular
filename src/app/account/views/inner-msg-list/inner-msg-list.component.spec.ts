import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerMsgListComponent } from './inner-msg-list.component';

describe('InnerMsgListComponent', () => {
  let component: InnerMsgListComponent;
  let fixture: ComponentFixture<InnerMsgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerMsgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerMsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
