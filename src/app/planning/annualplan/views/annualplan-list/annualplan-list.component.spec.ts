import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualplanListComponent } from './annualplan-list.component';

describe('AnnualplanListComponent', () => {
  let component: AnnualplanListComponent;
  let fixture: ComponentFixture<AnnualplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
