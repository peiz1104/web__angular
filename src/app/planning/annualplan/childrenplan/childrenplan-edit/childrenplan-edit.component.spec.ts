import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenplanEditComponent } from './childrenplan-edit.component';

describe('ChildrenplanEditComponent', () => {
  let component: ChildrenplanEditComponent;
  let fixture: ComponentFixture<ChildrenplanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenplanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenplanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
