import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityContentComponent } from './subject-activity-content.component';

describe('SubjectActivityContentComponent', () => {
  let component: SubjectActivityContentComponent;
  let fixture: ComponentFixture<SubjectActivityContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
