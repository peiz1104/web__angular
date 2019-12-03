import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenplanListComponent } from './childrenplan-list.component';

describe('ChildrenplanListComponent', () => {
  let component: ChildrenplanListComponent;
  let fixture: ComponentFixture<ChildrenplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
