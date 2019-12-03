import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCertificateComponent } from './training-class-certificate.component';

describe('TrainingClassCertificateComponent', () => {
  let component: TrainingClassCertificateComponent;
  let fixture: ComponentFixture<TrainingClassCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
