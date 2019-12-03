import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditScoreComponent } from './paper-edit-score.component';

describe('PaperEditScoreComponent', () => {
  let component: PaperEditScoreComponent;
  let fixture: ComponentFixture<PaperEditScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperEditScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperEditScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
