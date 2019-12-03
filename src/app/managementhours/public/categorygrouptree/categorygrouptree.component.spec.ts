import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorygrouptreeComponent } from './categorygrouptree.component';

describe('CategorygrouptreeComponent', () => {
  let component: CategorygrouptreeComponent;
  let fixture: ComponentFixture<CategorygrouptreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorygrouptreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorygrouptreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
