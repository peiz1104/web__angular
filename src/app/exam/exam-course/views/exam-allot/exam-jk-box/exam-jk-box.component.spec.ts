import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamJkBoxComponent } from './exam-jk-box.component';

describe('ExamJkBoxComponent', () => {
  let component: ExamJkBoxComponent;
  let fixture: ComponentFixture<ExamJkBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamJkBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamJkBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
