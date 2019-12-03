import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassReglistComponent } from './train-class-reglist.component';

describe('TrainClassReglistComponent', () => {
  let component: TrainClassReglistComponent;
  let fixture: ComponentFixture<TrainClassReglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassReglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassReglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
