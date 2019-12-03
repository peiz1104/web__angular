import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSynComponent } from './test-syn.component';

describe('TestSynComponent', () => {
  let component: TestSynComponent;
  let fixture: ComponentFixture<TestSynComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSynComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSynComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
