import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaspromotionComponent } from './haspromotion.component';

describe('HaspromotionComponent', () => {
  let component: HaspromotionComponent;
  let fixture: ComponentFixture<HaspromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaspromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaspromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
