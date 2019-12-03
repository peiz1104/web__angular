import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTbcbasePicklookComponent } from './training-class-tbcbase-picklook.component';

describe('TrainingClassTbcbasePicklookComponent', () => {
  let component: TrainingClassTbcbasePicklookComponent;
  let fixture: ComponentFixture<TrainingClassTbcbasePicklookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTbcbasePicklookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTbcbasePicklookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
