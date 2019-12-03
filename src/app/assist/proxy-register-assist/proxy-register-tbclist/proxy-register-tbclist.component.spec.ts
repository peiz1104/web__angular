import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyRegisterTbclistComponent } from './proxy-register-tbclist.component';

describe('ProxyRegisterTbclistComponent', () => {
  let component: ProxyRegisterTbclistComponent;
  let fixture: ComponentFixture<ProxyRegisterTbclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyRegisterTbclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyRegisterTbclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
