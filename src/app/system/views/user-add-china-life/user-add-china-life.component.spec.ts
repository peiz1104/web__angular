import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddChinaLifeComponent } from './user-add-china-life.component';

describe('UserAddChinaLifeComponent', () => {
  let component: UserAddChinaLifeComponent;
  let fixture: ComponentFixture<UserAddChinaLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddChinaLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddChinaLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
