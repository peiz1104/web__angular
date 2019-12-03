import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomNoticeBoxComponent } from './classroom-notice-box.component';

describe('ClassroomNoticeBoxComponent', () => {
  let component: ClassroomNoticeBoxComponent;
  let fixture: ComponentFixture<ClassroomNoticeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomNoticeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomNoticeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
