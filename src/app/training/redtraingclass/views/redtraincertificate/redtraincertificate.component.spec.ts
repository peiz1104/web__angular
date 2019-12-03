import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedtraincertificateComponent } from './redtraincertificate.component';

describe('RedtraincertificateComponent', () => {
  let component: RedtraincertificateComponent;
  let fixture: ComponentFixture<RedtraincertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedtraincertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedtraincertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
