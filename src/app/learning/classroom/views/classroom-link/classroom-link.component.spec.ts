import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomLinkComponent } from './classroom-link.component';

describe('ClassroomLinkComponent', () => {
  let component: ClassroomLinkComponent;
  let fixture: ComponentFixture<ClassroomLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
