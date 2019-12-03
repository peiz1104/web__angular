import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTypeEditComponent } from './cert-type-edit.component';

describe('CertTypeEditComponent', () => {
  let component: CertTypeEditComponent;
  let fixture: ComponentFixture<CertTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
