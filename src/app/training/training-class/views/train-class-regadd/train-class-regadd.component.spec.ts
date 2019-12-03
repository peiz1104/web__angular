import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassRegaddComponent } from './train-class-regadd.component';

describe('TrainClassRegaddComponent', () => {
  let component: TrainClassRegaddComponent;
  let fixture: ComponentFixture<TrainClassRegaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassRegaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassRegaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
