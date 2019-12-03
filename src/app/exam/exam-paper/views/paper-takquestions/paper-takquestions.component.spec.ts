import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperTakquestionsComponent } from './paper-takquestions.component';

describe('PaperTakquestionsComponent', () => {
  let component: PaperTakquestionsComponent;
  let fixture: ComponentFixture<PaperTakquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperTakquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperTakquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
