import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseconfigComponent } from './courseconfig.component';

describe('CourseconfigComponent', () => {
  let component: CourseconfigComponent;
  let fixture: ComponentFixture<CourseconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
