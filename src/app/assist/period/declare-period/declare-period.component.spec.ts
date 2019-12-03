import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarePeriodComponent } from './declare-period.component';

describe('DeclarePeriodComponent', () => {
  let component: DeclarePeriodComponent;
  let fixture: ComponentFixture<DeclarePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
