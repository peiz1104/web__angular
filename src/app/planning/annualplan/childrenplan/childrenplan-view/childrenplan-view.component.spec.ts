import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenplanViewComponent } from './childrenplan-view.component';

describe('ChildrenplanViewComponent', () => {
  let component: ChildrenplanViewComponent;
  let fixture: ComponentFixture<ChildrenplanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenplanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenplanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
