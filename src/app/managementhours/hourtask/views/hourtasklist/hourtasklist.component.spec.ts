import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourtasklistComponent } from './hourtasklist.component';

describe('HourtasklistComponent', () => {
  let component: HourtasklistComponent;
  let fixture: ComponentFixture<HourtasklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourtasklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourtasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
