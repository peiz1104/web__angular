import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicGroupListComponent } from './logic-group-list.component';

describe('LogicGroupListComponent', () => {
  let component: LogicGroupListComponent;
  let fixture: ComponentFixture<LogicGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
