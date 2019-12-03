import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicGroupSelectComponent } from './logic-group-select.component';

describe('LogicGroupSelectComponent', () => {
  let component: LogicGroupSelectComponent;
  let fixture: ComponentFixture<LogicGroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicGroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
