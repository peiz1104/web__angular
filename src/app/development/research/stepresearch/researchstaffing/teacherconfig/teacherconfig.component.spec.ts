import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherconfigComponent } from './teacherconfig.component';

describe('TeacherconfigComponent', () => {
  let component: TeacherconfigComponent;
  let fixture: ComponentFixture<TeacherconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
