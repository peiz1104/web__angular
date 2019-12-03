import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicGroupLookupFormComponent } from './logic-group-lookup-form.component';

describe('LogicGroupLookupFormComponent', () => {
  let component: LogicGroupLookupFormComponent;
  let fixture: ComponentFixture<LogicGroupLookupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicGroupLookupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicGroupLookupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
