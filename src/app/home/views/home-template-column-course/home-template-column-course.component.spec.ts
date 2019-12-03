import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnCourseComponent } from './home-template-column-course.component';

describe('HomeTemplateColumnCourseComponent', () => {
  let component: HomeTemplateColumnCourseComponent;
  let fixture: ComponentFixture<HomeTemplateColumnCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
