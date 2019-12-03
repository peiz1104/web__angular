import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagementGroupComponent } from './program-management-group.component';

describe('ProgramManagementGroupComponent', () => {
  let component: ProgramManagementGroupComponent;
  let fixture: ComponentFixture<ProgramManagementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
