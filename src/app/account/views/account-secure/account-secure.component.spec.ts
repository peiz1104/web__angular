import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSecureComponent } from './account-secure.component';

describe('AccountSecureComponent', () => {
  let component: AccountSecureComponent;
  let fixture: ComponentFixture<AccountSecureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSecureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
