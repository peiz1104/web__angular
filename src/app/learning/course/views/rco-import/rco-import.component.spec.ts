import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoImportComponent } from './rco-import.component';

describe('RcoImportComponent', () => {
  let component: RcoImportComponent;
  let fixture: ComponentFixture<RcoImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
