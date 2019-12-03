import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicableObjectsListComponent } from './applicable-objects-list.component';

describe('ApplicableObjectsListComponent', () => {
  let component: ApplicableObjectsListComponent;
  let fixture: ComponentFixture<ApplicableObjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicableObjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicableObjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
