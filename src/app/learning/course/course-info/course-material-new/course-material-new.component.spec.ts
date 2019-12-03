import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMaterialNewComponent } from './course-material-new.component';

describe('CourseMaterialNewComponent', () => {
  let component: CourseMaterialNewComponent;
  let fixture: ComponentFixture<CourseMaterialNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMaterialNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMaterialNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
