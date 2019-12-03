import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAddGroupComponent } from './exam-add-group.component';

describe('ExamAddGroupComponent', () => {
  let component: ExamAddGroupComponent;
  let fixture: ComponentFixture<ExamAddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAddGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
