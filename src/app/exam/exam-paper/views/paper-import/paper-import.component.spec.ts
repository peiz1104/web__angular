import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperImportComponent } from './paper-import.component';

describe('PaperImportComponent', () => {
  let component: PaperImportComponent;
  let fixture: ComponentFixture<PaperImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
