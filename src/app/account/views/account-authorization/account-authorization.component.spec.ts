import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAuthorizationComponent } from './account-authorization.component';

describe('AccountAuthorizationComponent', () => {
  let component: AccountAuthorizationComponent;
  let fixture: ComponentFixture<AccountAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
