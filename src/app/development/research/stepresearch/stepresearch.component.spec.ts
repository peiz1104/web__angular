import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepresearchComponent } from './stepresearch.component';

describe('StepresearchComponent', () => {
  let component: StepresearchComponent;
  let fixture: ComponentFixture<StepresearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepresearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepresearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
