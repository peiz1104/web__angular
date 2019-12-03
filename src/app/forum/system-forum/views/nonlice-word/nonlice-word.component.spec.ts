import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonliceWordComponent } from './nonlice-word.component';

describe('NonliceWordComponent', () => {
  let component: NonliceWordComponent;
  let fixture: ComponentFixture<NonliceWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonliceWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonliceWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
