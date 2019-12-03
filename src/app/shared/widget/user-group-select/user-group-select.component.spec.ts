import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupSelectComponent } from './user-group-select.component';

describe('UserGroupSelectComponent', () => {
  let component: UserGroupSelectComponent;
  let fixture: ComponentFixture<UserGroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
