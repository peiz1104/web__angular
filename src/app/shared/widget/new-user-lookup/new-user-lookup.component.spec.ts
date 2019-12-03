import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserLookupComponent } from './new-user-lookup.component';

describe('NewUserLookupComponent', () => {
  let component: NewUserLookupComponent;
  let fixture: ComponentFixture<NewUserLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
