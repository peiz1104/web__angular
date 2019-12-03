import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsourceComponent } from './trainsource.component';

describe('TrainsourceComponent', () => {
  let component: TrainsourceComponent;
  let fixture: ComponentFixture<TrainsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
