import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualplanDetailComponent } from './annualplan-detail.component';

describe('AnnualplanDetailComponent', () => {
  let component: AnnualplanDetailComponent;
  let fixture: ComponentFixture<AnnualplanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualplanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
