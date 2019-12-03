import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingRecommendComponent } from './offering-recommend.component';

describe('OfferingRecommendComponent', () => {
  let component: OfferingRecommendComponent;
  let fixture: ComponentFixture<OfferingRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
