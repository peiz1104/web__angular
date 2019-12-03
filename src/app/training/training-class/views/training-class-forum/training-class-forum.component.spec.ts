import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassForumComponent } from './training-class-forum.component';

describe('TrainingClassForumComponent', () => {
  let component: TrainingClassForumComponent;
  let fixture: ComponentFixture<TrainingClassForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
