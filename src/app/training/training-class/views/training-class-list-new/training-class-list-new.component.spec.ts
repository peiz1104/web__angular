import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassListNewComponent } from './training-class-list-new.component';

describe('TrainingClassListNewComponent', () => {
  let component: TrainingClassListNewComponent;
  let fixture: ComponentFixture<TrainingClassListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
