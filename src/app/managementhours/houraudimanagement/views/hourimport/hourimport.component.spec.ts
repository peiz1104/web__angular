import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourimportComponent } from './hourimport.component';

describe('HourimportComponent', () => {
  let component: HourimportComponent;
  let fixture: ComponentFixture<HourimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
