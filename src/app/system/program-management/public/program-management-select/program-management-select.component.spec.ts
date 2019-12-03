import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagementSelectComponent } from './program-management-select.component';

describe('ProgramManagementSelectComponent', () => {
  let component: ProgramManagementSelectComponent;
  let fixture: ComponentFixture<ProgramManagementSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagementSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagementSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
