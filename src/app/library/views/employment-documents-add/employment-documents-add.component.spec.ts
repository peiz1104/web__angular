import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDocumentsAddComponent } from './employment-documents-add.component';

describe('EmploymentDocumentsAddComponent', () => {
  let component: EmploymentDocumentsAddComponent;
  let fixture: ComponentFixture<EmploymentDocumentsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentDocumentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentDocumentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
