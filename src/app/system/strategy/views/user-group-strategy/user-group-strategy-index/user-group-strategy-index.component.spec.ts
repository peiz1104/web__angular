import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGroupStrategyIndexComponent } from './user-group-strategy-index.component';

describe('UserGroupStrategyIndexComponent', () => {
  let component: UserGroupStrategyIndexComponent;
  let fixture: ComponentFixture<UserGroupStrategyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupStrategyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupStrategyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
