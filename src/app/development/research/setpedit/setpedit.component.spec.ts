import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpeditComponent } from './setpedit.component';

describe('SetpeditComponent', () => {
  let component: SetpeditComponent;
  let fixture: ComponentFixture<SetpeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
