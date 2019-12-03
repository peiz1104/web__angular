import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassPreviewComponent } from './training-class-preview.component';

describe('TrainingClassPreviewComponent', () => {
  let component: TrainingClassPreviewComponent;
  let fixture: ComponentFixture<TrainingClassPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
