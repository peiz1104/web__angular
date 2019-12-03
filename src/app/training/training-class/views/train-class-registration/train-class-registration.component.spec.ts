import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassRegistrationComponent } from './train-class-registration.component';

describe('TrainClassRegistrationComponent', () => {
  let component: TrainClassRegistrationComponent;
  let fixture: ComponentFixture<TrainClassRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
