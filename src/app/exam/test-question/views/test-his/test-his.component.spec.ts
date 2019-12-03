import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHisComponent } from './test-his.component';

describe('TestHisComponent', () => {
  let component: TestHisComponent;
  let fixture: ComponentFixture<TestHisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
