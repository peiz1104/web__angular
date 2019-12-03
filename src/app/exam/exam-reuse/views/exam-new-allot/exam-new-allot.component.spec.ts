import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamNewAllotComponent } from './exam-new-allot.component';

describe('ExamNewAllotComponent', () => {
  let component: ExamNewAllotComponent;
  let fixture: ComponentFixture<ExamNewAllotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamNewAllotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamNewAllotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
