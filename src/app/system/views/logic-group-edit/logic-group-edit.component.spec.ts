import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicGroupEditComponent } from './logic-group-edit.component';

describe('LogicGroupEditComponent', () => {
  let component: LogicGroupEditComponent;
  let fixture: ComponentFixture<LogicGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
