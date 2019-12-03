import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassClassfileComponent } from './train-class-classfile.component';

describe('TrainClassClassfileComponent', () => {
  let component: TrainClassClassfileComponent;
  let fixture: ComponentFixture<TrainClassClassfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassClassfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassClassfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
