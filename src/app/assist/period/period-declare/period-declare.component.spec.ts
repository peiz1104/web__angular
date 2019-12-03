import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDeclareComponent } from './period-declare.component';

describe('PeriodDeclareComponent', () => {
  let component: PeriodDeclareComponent;
  let fixture: ComponentFixture<PeriodDeclareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodDeclareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodDeclareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
