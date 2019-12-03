import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagementTreeComponent } from './program-management-tree.component';

describe('ProgramManagementTreeComponent', () => {
  let component: ProgramManagementTreeComponent;
  let fixture: ComponentFixture<ProgramManagementTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagementTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagementTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
