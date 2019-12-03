import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHourListComponent } from './group-hour-list.component';

describe('GroupHourListComponent', () => {
  let component: GroupHourListComponent;
  let fixture: ComponentFixture<GroupHourListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHourListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
