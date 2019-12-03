import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTbcbaseWifilookComponent } from './training-class-tbcbase-wifilook.component';

describe('TrainingClassTbcbaseWifilookComponent', () => {
  let component: TrainingClassTbcbaseWifilookComponent;
  let fixture: ComponentFixture<TrainingClassTbcbaseWifilookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTbcbaseWifilookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTbcbaseWifilookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
