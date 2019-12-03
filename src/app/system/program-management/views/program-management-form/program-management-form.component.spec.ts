import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagementFormComponent } from './program-management-form.component';

describe('ProgramManagementFormComponent', () => {
  let component: ProgramManagementFormComponent;
  let fixture: ComponentFixture<ProgramManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
