import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTplListComponent } from './survey-tpl-list.component';

describe('SurveyTplListComponent', () => {
  let component: SurveyTplListComponent;
  let fixture: ComponentFixture<SurveyTplListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTplListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTplListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
