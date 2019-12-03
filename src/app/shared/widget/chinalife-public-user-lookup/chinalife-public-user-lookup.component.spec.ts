import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinalifePublicUserLookupComponent } from './chinalife-public-user-lookup.component';

describe('ChinalifePublicUserLookupComponent', () => {
  let component: ChinalifePublicUserLookupComponent;
  let fixture: ComponentFixture<ChinalifePublicUserLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinalifePublicUserLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinalifePublicUserLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
