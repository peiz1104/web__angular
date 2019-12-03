import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMainComponent } from './notification-main.component';

describe('NotificationMainComponent', () => {
  let component: NotificationMainComponent;
  let fixture: ComponentFixture<NotificationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
