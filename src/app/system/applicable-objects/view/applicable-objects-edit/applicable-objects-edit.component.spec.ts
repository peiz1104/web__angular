import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicableObjectsEditComponent } from './applicable-objects-edit.component';

describe('ApplicableObjectsEditComponent', () => {
  let component: ApplicableObjectsEditComponent;
  let fixture: ComponentFixture<ApplicableObjectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicableObjectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicableObjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
