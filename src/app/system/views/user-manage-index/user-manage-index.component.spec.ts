import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageIndexComponent } from './user-manage-index.component';

describe('UserManageIndexComponent', () => {
  let component: UserManageIndexComponent;
  let fixture: ComponentFixture<UserManageIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
