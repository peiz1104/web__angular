import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSubscribeComponent } from './notification-subscribe.component';

describe('NotificationSubscribeComponent', () => {
  let component: NotificationSubscribeComponent;
  let fixture: ComponentFixture<NotificationSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
