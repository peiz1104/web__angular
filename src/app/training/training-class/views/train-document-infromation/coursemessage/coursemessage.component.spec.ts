import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursemessageComponent } from './coursemessage.component';

describe('CoursemessageComponent', () => {
  let component: CoursemessageComponent;
  let fixture: ComponentFixture<CoursemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
