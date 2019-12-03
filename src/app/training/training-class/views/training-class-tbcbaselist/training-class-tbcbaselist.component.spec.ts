import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTbcbaselistComponent } from './training-class-tbcbaselist.component';

describe('TrainingClassTbcbaselistComponent', () => {
  let component: TrainingClassTbcbaselistComponent;
  let fixture: ComponentFixture<TrainingClassTbcbaselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTbcbaselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTbcbaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
