import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourauditdeclarelistComponent } from './hourauditdeclarelist.component';

describe('HourauditdeclarelistComponent', () => {
  let component: HourauditdeclarelistComponent;
  let fixture: ComponentFixture<HourauditdeclarelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourauditdeclarelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourauditdeclarelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
