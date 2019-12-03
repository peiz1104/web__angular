import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourtaskviewComponent } from './hourtaskview.component';

describe('HourtaskviewComponent', () => {
  let component: HourtaskviewComponent;
  let fixture: ComponentFixture<HourtaskviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourtaskviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourtaskviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
