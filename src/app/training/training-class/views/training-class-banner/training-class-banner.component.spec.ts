import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassBannerComponent } from './training-class-banner.component';

describe('TrainingClassBannerComponent', () => {
  let component: TrainingClassBannerComponent;
  let fixture: ComponentFixture<TrainingClassBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
