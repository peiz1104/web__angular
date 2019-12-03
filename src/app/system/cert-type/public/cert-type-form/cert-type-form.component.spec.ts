import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTypeFormComponent } from './cert-type-form.component';

describe('CertTypeFormComponent', () => {
  let component: CertTypeFormComponent;
  let fixture: ComponentFixture<CertTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
