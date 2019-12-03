import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAllImportComponent } from './paper-all-import.component';

describe('PaperAllImportComponent', () => {
  let component: PaperAllImportComponent;
  let fixture: ComponentFixture<PaperAllImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperAllImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperAllImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
