import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPaperListComponent } from './survey-paper-list.component';

describe('SurveyPaperListComponent', () => {
  let component: SurveyPaperListComponent;
  let fixture: ComponentFixture<SurveyPaperListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPaperListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
