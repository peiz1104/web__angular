import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityDetailComponent } from './subject-activity-detail.component';

describe('SubjectActivityDetailComponent', () => {
  let component: SubjectActivityDetailComponent;
  let fixture: ComponentFixture<SubjectActivityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
