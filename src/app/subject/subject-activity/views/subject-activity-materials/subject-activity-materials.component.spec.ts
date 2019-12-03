import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityMaterialsComponent } from './subject-activity-materials.component';

describe('SubjectActivityMaterialsComponent', () => {
  let component: SubjectActivityMaterialsComponent;
  let fixture: ComponentFixture<SubjectActivityMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
