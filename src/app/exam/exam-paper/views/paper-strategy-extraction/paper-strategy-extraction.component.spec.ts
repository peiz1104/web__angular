import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperStrategyExtractionComponent } from './paper-strategy-extraction.component';

describe('PaperStrategyExtractionComponent', () => {
  let component: PaperStrategyExtractionComponent;
  let fixture: ComponentFixture<PaperStrategyExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperStrategyExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperStrategyExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
