import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytreeComponent } from './categorytree.component';

describe('CategorytreeComponent', () => {
  let component: CategorytreeComponent;
  let fixture: ComponentFixture<CategorytreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorytreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorytreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
