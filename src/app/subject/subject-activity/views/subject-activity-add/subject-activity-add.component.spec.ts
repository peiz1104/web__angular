import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityAddComponent } from './subject-activity-add.component';

describe('SubjectActivityAddComponent', () => {
  let component: SubjectActivityAddComponent;
  let fixture: ComponentFixture<SubjectActivityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
