import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamKaBoxComponent } from './exam-ka-box.component';

describe('ExamKaBoxComponent', () => {
  let component: ExamKaBoxComponent;
  let fixture: ComponentFixture<ExamKaBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamKaBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamKaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
