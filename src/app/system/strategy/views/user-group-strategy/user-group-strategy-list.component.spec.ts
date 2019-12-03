import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupStrategyListComponent } from './user-group-strategy-list.component';

describe('UserGroupStrategyComponent', () => {
  let component: UserGroupStrategyListComponent;
  let fixture: ComponentFixture<UserGroupStrategyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupStrategyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
