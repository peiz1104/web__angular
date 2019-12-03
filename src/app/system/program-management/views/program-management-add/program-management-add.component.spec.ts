import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagementAddComponent } from './program-management-add.component';

describe('ProgramManagementAddComponent', () => {
  let component: ProgramManagementAddComponent;
  let fixture: ComponentFixture<ProgramManagementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
