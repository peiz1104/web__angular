import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassMaterialComponent } from './training-class-material.component';

describe('TrainingClassMaterialComponent', () => {
  let component: TrainingClassMaterialComponent;
  let fixture: ComponentFixture<TrainingClassMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
