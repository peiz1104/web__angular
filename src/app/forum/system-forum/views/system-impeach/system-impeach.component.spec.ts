import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemImpeachComponent } from './system-impeach.component';

describe('SystemImpeachComponent', () => {
  let component: SystemImpeachComponent;
  let fixture: ComponentFixture<SystemImpeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemImpeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemImpeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
