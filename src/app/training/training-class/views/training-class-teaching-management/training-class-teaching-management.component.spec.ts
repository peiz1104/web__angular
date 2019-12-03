import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTeachingManagementComponent } from './training-class-teaching-management.component';

describe('TrainingClassTeachingManagementComponent', () => {
  let component: TrainingClassTeachingManagementComponent;
  let fixture: ComponentFixture<TrainingClassTeachingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTeachingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTeachingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
