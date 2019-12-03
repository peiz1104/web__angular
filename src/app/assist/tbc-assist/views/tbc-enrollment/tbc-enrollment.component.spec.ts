import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcEnrollmentComponent } from './tbc-enrollment.component';

describe('TbcEnrollmentComponent', () => {
  let component: TbcEnrollmentComponent;
  let fixture: ComponentFixture<TbcEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
