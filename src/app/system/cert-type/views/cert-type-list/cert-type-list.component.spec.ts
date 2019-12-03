import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTypeListComponent } from './cert-type-list.component';

describe('CertTypeListComponent', () => {
  let component: CertTypeListComponent;
  let fixture: ComponentFixture<CertTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
