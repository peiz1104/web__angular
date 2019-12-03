import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplPaperComponent } from './survey-tpl-paper.component';

describe('SurveyTplPaperComponent', () => {
  let component: SurveyTplPaperComponent;
  let fixture: ComponentFixture<SurveyTplPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
