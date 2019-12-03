import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplLookupComponent } from './survey-tpl-lookup.component';

describe('SurveyTplLookupComponent', () => {
  let component: SurveyTplLookupComponent;
  let fixture: ComponentFixture<SurveyTplLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
