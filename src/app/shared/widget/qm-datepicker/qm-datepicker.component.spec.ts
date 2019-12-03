import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDatepickerComponent } from './qm-datepicker.component';

describe('QmDatepickerComponent', () => {
  let component: QmDatepickerComponent;
  let fixture: ComponentFixture<QmDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
