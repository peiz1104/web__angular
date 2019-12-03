import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMarkingBoxComponent } from './exam-marking-box.component';

describe('ExamMarkingBoxComponent', () => {
  let component: ExamMarkingBoxComponent;
  let fixture: ComponentFixture<ExamMarkingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMarkingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMarkingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
