import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenplanAddComponent } from './childrenplan-add.component';

describe('ChildrenplanAddComponent', () => {
  let component: ChildrenplanAddComponent;
  let fixture: ComponentFixture<ChildrenplanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenplanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenplanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
