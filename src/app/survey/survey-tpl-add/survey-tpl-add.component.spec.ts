import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplAddComponent } from './survey-tpl-add.component';

describe('SurveyTplAddComponent', () => {
  let component: SurveyTplAddComponent;
  let fixture: ComponentFixture<SurveyTplAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
