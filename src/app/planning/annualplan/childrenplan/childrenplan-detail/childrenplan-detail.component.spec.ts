import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenplanDetailComponent } from './childrenplan-detail.component';

describe('ChildrenplanDetailComponent', () => {
  let component: ChildrenplanDetailComponent;
  let fixture: ComponentFixture<ChildrenplanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenplanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
