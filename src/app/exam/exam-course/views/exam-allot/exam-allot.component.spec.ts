import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAllotComponent } from './exam-allot.component';

describe('ExamAllotComponent', () => {
  let component: ExamAllotComponent;
  let fixture: ComponentFixture<ExamAllotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAllotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAllotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
