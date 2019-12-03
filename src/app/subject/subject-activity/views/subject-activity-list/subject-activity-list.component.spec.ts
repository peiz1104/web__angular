import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityListComponent } from './subject-activity-list.component';

describe('SubjectActivityListComponent', () => {
  let component: SubjectActivityListComponent;
  let fixture: ComponentFixture<SubjectActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
