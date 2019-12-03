import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchassessmentComponent } from './researchassessment.component';

describe('ResearchassessmentComponent', () => {
  let component: ResearchassessmentComponent;
  let fixture: ComponentFixture<ResearchassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
