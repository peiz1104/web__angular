import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofficecalendarComponent } from './headofficecalendar.component';

describe('HeadofficecalendarComponent', () => {
  let component: HeadofficecalendarComponent;
  let fixture: ComponentFixture<HeadofficecalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofficecalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofficecalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
