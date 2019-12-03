import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityForumComponent } from './subject-activity-forum.component';

describe('SubjectActivityForumComponent', () => {
  let component: SubjectActivityForumComponent;
  let fixture: ComponentFixture<SubjectActivityForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
