import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperLookupComponent } from './paper-lookup.component';

describe('PaperLookupComponent', () => {
  let component: PaperLookupComponent;
  let fixture: ComponentFixture<PaperLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
