import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessAnalysisComponent } from './assess-analysis.component';

describe('AssessAnalysisComponent', () => {
  let component: AssessAnalysisComponent;
  let fixture: ComponentFixture<AssessAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
