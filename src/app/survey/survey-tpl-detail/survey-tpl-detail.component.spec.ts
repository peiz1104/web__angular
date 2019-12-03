import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplDetailComponent } from './survey-tpl-detail.component';

describe('SurveyTplDetailComponent', () => {
  let component: SurveyTplDetailComponent;
  let fixture: ComponentFixture<SurveyTplDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
