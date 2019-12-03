import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedtrainTrafficComponent } from './redtrain-traffic.component';

describe('RedtrainTrafficComponent', () => {
  let component: RedtrainTrafficComponent;
  let fixture: ComponentFixture<RedtrainTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedtrainTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedtrainTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
