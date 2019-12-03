import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListNewComponent } from './user-list-new.component';

describe('UserListNewComponent', () => {
  let component: UserListNewComponent;
  let fixture: ComponentFixture<UserListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
