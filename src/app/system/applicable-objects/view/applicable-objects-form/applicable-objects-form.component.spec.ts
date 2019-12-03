import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicableObjectsFormComponent } from './applicable-objects-form.component';

describe('ApplicableObjectsFormComponent', () => {
  let component: ApplicableObjectsFormComponent;
  let fixture: ComponentFixture<ApplicableObjectsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicableObjectsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicableObjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
