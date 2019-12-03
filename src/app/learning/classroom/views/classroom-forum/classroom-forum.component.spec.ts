import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomForumComponent } from './classroom-forum.component';

describe('ClassroomForumComponent', () => {
  let component: ClassroomForumComponent;
  let fixture: ComponentFixture<ClassroomForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
