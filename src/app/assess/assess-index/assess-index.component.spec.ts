import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessIndexComponent } from './assess-index.component';

describe('AssessIndexComponent', () => {
  let component: AssessIndexComponent;
  let fixture: ComponentFixture<AssessIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
