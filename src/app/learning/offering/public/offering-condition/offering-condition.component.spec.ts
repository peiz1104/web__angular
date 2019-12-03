import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingConditionComponent } from './offering-condition.component';

describe('OfferingConditionComponent', () => {
  let component: OfferingConditionComponent;
  let fixture: ComponentFixture<OfferingConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
