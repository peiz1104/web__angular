import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeManagementFormComponent } from './type-management-form.component';

describe('TypeManagementFormComponent', () => {
  let component: TypeManagementFormComponent;
  let fixture: ComponentFixture<TypeManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
