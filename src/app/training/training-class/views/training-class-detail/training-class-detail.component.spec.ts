import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassDetailComponent } from './training-class-detail.component';

describe('TrainingClassDetailComponent', () => {
  let component: TrainingClassDetailComponent;
  let fixture: ComponentFixture<TrainingClassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
