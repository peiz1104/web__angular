import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualplanFormComponent } from './annualplan-form.component';

describe('AnnualplanFormComponent', () => {
  let component: AnnualplanFormComponent;
  let fixture: ComponentFixture<AnnualplanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualplanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
