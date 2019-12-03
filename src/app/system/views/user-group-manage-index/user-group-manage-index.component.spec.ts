import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupManageIndexComponent } from './user-group-manage-index.component';

describe('UserGroupManageIndexComponent', () => {
  let component: UserGroupManageIndexComponent;
  let fixture: ComponentFixture<UserGroupManageIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupManageIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupManageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
