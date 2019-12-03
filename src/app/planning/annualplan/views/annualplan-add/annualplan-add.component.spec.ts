import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualplanAddComponent } from './annualplan-add.component';

describe('AnnualplanAddComponent', () => {
  let component: AnnualplanAddComponent;
  let fixture: ComponentFixture<AnnualplanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualplanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualplanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
