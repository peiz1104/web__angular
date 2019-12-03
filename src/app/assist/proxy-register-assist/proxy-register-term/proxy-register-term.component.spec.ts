import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyRegisterTermComponent } from './proxy-register-term.component';

describe('ProxyRegisterTermComponent', () => {
  let component: ProxyRegisterTermComponent;
  let fixture: ComponentFixture<ProxyRegisterTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyRegisterTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyRegisterTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
