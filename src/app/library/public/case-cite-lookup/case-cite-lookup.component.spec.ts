import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCiteLookupComponent } from './case-cite-lookup.component';

describe('CaseCiteLookupComponent', () => {
  let component: CaseCiteLookupComponent;
  let fixture: ComponentFixture<CaseCiteLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCiteLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCiteLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
