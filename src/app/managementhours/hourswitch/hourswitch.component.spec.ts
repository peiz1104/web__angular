import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourswitchComponent } from './hourswitch.component';

describe('HourswitchComponent', () => {
  let component: HourswitchComponent;
  let fixture: ComponentFixture<HourswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
