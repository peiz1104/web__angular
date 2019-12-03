import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaltrafficComponent } from './localtraffic.component';

describe('LocaltrafficComponent', () => {
  let component: LocaltrafficComponent;
  let fixture: ComponentFixture<LocaltrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaltrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaltrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
