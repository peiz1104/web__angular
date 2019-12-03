import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyConditionComponent } from './survey-condition.component';

describe('SurveyConditionComponent', () => {
  let component: SurveyConditionComponent;
  let fixture: ComponentFixture<SurveyConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
