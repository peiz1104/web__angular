import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpeachComponent } from './impeach.component';

describe('ImpeachComponent', () => {
  let component: ImpeachComponent;
  let fixture: ComponentFixture<ImpeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
