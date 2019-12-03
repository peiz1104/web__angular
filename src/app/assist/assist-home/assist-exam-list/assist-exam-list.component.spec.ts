import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistExamListComponent } from './assist-exam-list.component';

describe('AssistExamListComponent', () => {
  let component: AssistExamListComponent;
  let fixture: ComponentFixture<AssistExamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistExamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
