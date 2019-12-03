import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeFormControlComponent } from './privilege-form-control.component';

describe('PrivilegeFormControlComponent', () => {
  let component: PrivilegeFormControlComponent;
  let fixture: ComponentFixture<PrivilegeFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
