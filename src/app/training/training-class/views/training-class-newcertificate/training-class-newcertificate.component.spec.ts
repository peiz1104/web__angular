import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassNewcertificateComponent } from './training-class-newcertificate.component';

describe('TrainingClassNewcertificateComponent', () => {
  let component: TrainingClassNewcertificateComponent;
  let fixture: ComponentFixture<TrainingClassNewcertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassNewcertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassNewcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
