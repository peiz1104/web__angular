import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedclassdetailComponent } from './redclassdetail.component';

describe('RedclassdetailComponent', () => {
  let component: RedclassdetailComponent;
  let fixture: ComponentFixture<RedclassdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedclassdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedclassdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
