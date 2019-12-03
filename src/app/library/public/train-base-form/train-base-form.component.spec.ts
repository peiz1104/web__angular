import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainBaseFormComponent } from './train-base-form.component';

describe('TrainBaseFormComponent', () => {
  let component: TrainBaseFormComponent;
  let fixture: ComponentFixture<TrainBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainBaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
