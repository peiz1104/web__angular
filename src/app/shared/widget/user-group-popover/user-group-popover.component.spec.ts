import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupPopoverComponent } from './user-group-popover.component';

describe('UserGroupPopoverComponent', () => {
  let component: UserGroupPopoverComponent;
  let fixture: ComponentFixture<UserGroupPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
