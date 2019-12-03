import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormNewComponent } from './user-form-new.component';

describe('UserFormNewComponent', () => {
  let component: UserFormNewComponent;
  let fixture: ComponentFixture<UserFormNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
