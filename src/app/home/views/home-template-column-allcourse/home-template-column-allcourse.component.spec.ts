import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnAllcourseComponent } from './home-template-column-allcourse.component';

describe('HomeTemplateColumnAllcourseComponent', () => {
  let component: HomeTemplateColumnAllcourseComponent;
  let fixture: ComponentFixture<HomeTemplateColumnAllcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnAllcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnAllcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
