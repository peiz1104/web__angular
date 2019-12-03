import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfLookComponent } from './pdf-look.component';

describe('PdfLookComponent', () => {
  let component: PdfLookComponent;
  let fixture: ComponentFixture<PdfLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
