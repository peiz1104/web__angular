import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammanagementEditComponent } from './programmanagement-edit.component';

describe('ProgrammanagementEditComponent', () => {
  let component: ProgrammanagementEditComponent;
  let fixture: ComponentFixture<ProgrammanagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammanagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammanagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
