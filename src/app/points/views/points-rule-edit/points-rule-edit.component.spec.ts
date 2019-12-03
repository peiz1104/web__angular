import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsRuleEditComponent } from './points-rule-edit.component';

describe('PointsRuleComponent', () => {
  let component: PointsRuleEditComponent;
  let fixture: ComponentFixture<PointsRuleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsRuleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsRuleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
