import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTeacherLookComponent } from './documents-teacher-look.component';

describe('DocumentsTeacherLookComponent', () => {
  let component: DocumentsTeacherLookComponent;
  let fixture: ComponentFixture<DocumentsTeacherLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsTeacherLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsTeacherLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
