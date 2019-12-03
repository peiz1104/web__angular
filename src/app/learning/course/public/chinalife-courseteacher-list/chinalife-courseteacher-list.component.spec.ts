import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinalifeCourseteacherListComponent } from './chinalife-courseteacher-list.component';

describe('ChinalifeCourseteacherListComponent', () => {
  let component: ChinalifeCourseteacherListComponent;
  let fixture: ComponentFixture<ChinalifeCourseteacherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinalifeCourseteacherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinalifeCourseteacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
