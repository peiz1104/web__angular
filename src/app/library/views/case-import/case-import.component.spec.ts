import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseImportComponent } from './case-import.component';

describe('CaseImportComponent', () => {
  let component: CaseImportComponent;
  let fixture: ComponentFixture<CaseImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
