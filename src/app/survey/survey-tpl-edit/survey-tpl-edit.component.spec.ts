import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplEditComponent } from './survey-tpl-edit.component';

describe('SurveyTplEditComponent', () => {
  let component: SurveyTplEditComponent;
  let fixture: ComponentFixture<SurveyTplEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
