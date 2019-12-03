import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTbcbaseaddComponent } from './training-class-tbcbaseadd.component';

describe('TrainingClassTbcbaseaddComponent', () => {
  let component: TrainingClassTbcbaseaddComponent;
  let fixture: ComponentFixture<TrainingClassTbcbaseaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTbcbaseaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTbcbaseaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
