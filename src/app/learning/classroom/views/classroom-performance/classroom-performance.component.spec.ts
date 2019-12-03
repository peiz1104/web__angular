import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomPerformanceComponent } from './classroom-performance.component';

describe('ClassroomPerformanceComponent', () => {
  let component: ClassroomPerformanceComponent;
  let fixture: ComponentFixture<ClassroomPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
