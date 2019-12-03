import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourruleviewComponent } from './hourruleview.component';

describe('HourruleviewComponent', () => {
  let component: HourruleviewComponent;
  let fixture: ComponentFixture<HourruleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourruleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourruleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
