import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourauditlistComponent } from './hourauditlist.component';

describe('HourauditlistComponent', () => {
  let component: HourauditlistComponent;
  let fixture: ComponentFixture<HourauditlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourauditlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourauditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
