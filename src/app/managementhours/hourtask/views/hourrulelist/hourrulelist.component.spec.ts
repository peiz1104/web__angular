import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourrulelistComponent } from './hourrulelist.component';

describe('HourrulelistComponent', () => {
  let component: HourrulelistComponent;
  let fixture: ComponentFixture<HourrulelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourrulelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourrulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
