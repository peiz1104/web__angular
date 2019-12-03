import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsRuleComponent } from './points-rule-list.component';

describe('PointsRuleComponent', () => {
  let component: PointsRuleComponent;
  let fixture: ComponentFixture<PointsRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
