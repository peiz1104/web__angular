import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPreferenceComponent } from './account-preference.component';

describe('AccountPreferenceComponent', () => {
  let component: AccountPreferenceComponent;
  let fixture: ComponentFixture<AccountPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
