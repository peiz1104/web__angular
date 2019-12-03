import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgLookupComponent } from './ug-lookup.component';

describe('UgLookupComponent', () => {
  let component: UgLookupComponent;
  let fixture: ComponentFixture<UgLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
