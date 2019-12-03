import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassFormNewComponent } from './training-class-form-new.component';

describe('TrainingClassFormNewComponent', () => {
  let component: TrainingClassFormNewComponent;
  let fixture: ComponentFixture<TrainingClassFormNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassFormNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
