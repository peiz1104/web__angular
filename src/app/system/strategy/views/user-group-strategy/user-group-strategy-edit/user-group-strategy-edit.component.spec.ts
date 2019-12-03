import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGroupStrategyEditComponent } from './user-group-strategy-edit.component';

describe('UserGroupStrategyEditComponent', () => {
  let component: UserGroupStrategyEditComponent;
  let fixture: ComponentFixture<UserGroupStrategyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupStrategyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupStrategyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
