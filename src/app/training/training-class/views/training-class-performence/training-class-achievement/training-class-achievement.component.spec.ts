import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAchievementComponent } from './training-class-achievement.component';

describe('TrainingClassAchievementComponent', () => {
  let component: TrainingClassAchievementComponent;
  let fixture: ComponentFixture<TrainingClassAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
