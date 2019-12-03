import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermUserImportComponent } from './term-user-import.component';

describe('TermUserImportComponent', () => {
  let component: TermUserImportComponent;
  let fixture: ComponentFixture<TermUserImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermUserImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermUserImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
