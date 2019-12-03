import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopoverComponent } from './category-popover.component';

describe('CategoryPopoverComponent', () => {
  let component: CategoryPopoverComponent;
  let fixture: ComponentFixture<CategoryPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
