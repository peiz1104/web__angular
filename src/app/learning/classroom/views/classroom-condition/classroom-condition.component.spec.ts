import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomConditionComponent } from './classroom-condition.component';

describe('ClassroomConditionComponent', () => {
  let component: ClassroomConditionComponent;
  let fixture: ComponentFixture<ClassroomConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
