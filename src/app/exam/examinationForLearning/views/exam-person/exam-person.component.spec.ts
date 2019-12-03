import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPersonComponent } from './exam-person.component';

describe('ExamPersonComponent', () => {
  let component: ExamPersonComponent;
  let fixture: ComponentFixture<ExamPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
