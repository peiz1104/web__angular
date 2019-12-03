import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicableObjectsComponent } from './add-applicable-objects.component';

describe('AddApplicableObjectsComponent', () => {
  let component: AddApplicableObjectsComponent;
  let fixture: ComponentFixture<AddApplicableObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicableObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicableObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
