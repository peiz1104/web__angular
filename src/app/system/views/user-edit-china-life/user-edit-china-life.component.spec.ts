import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditChinaLifeComponent } from './user-edit-china-life.component';

describe('UserEditChinaLifeComponent', () => {
  let component: UserEditChinaLifeComponent;
  let fixture: ComponentFixture<UserEditChinaLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditChinaLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditChinaLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
