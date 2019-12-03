import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualplanEditComponent } from './annualplan-edit.component';

describe('AnnualplanEditComponent', () => {
  let component: AnnualplanEditComponent;
  let fixture: ComponentFixture<AnnualplanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualplanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualplanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
