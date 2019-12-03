import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityComponentComponent } from './subject-activity-component.component';

describe('SubjectActivityComponentComponent', () => {
  let component: SubjectActivityComponentComponent;
  let fixture: ComponentFixture<SubjectActivityComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
