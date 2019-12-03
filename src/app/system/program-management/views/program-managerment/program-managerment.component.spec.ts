import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagermentComponent } from './program-managerment.component';

describe('ProgramManagermentComponent', () => {
  let component: ProgramManagermentComponent;
  let fixture: ComponentFixture<ProgramManagermentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramManagermentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
