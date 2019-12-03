import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupStrategyAddComponent } from './user-group-strategy-add.component';

describe('UserGroupStrategyAddComponent', () => {
  let component: UserGroupStrategyAddComponent;
  let fixture: ComponentFixture<UserGroupStrategyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupStrategyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupStrategyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
