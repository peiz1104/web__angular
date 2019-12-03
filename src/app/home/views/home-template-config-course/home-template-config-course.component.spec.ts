import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigCourseComponent } from './home-template-config-course.component';

describe('HomeTemplateConfigCourseComponent', () => {
  let component: HomeTemplateConfigCourseComponent;
  let fixture: ComponentFixture<HomeTemplateConfigCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
