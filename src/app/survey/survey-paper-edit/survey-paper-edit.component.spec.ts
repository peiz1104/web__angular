import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPaperEditComponent } from './survey-paper-edit.component';

describe('SurveyPaperEditComponent', () => {
  let component: SurveyPaperEditComponent;
  let fixture: ComponentFixture<SurveyPaperEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPaperEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPaperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
