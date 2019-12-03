import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDocumentsListComponent } from './employment-documents-list.component';

describe('EmploymentDocumentsListComponent', () => {
  let component: EmploymentDocumentsListComponent;
  let fixture: ComponentFixture<EmploymentDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
