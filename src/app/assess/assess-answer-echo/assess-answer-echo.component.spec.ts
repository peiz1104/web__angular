import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessAnswerEchoComponent } from './assess-answer-echo.component';

describe('AssessAnswerEchoComponent', () => {
  let component: AssessAnswerEchoComponent;
  let fixture: ComponentFixture<AssessAnswerEchoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessAnswerEchoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessAnswerEchoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
