import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTypeAddComponent } from './cert-type-add.component';

describe('CertTypeAddComponent', () => {
  let component: CertTypeAddComponent;
  let fixture: ComponentFixture<CertTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
