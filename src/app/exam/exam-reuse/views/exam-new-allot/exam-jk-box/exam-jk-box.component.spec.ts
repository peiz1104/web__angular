import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamNewJkBoxComponent } from './exam-jk-box.component';

describe('ExamNewJkBoxComponent', () => {
  let component: ExamNewJkBoxComponent;
  let fixture: ComponentFixture<ExamNewJkBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamNewJkBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamNewJkBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
