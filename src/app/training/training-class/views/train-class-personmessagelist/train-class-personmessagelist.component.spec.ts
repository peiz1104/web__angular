import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassPersonmessagelistComponent } from './train-class-personmessagelist.component';

describe('TrainClassPersonmessagelistComponent', () => {
  let component: TrainClassPersonmessagelistComponent;
  let fixture: ComponentFixture<TrainClassPersonmessagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassPersonmessagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassPersonmessagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
