import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupTreeComponent } from './user-group-tree.component';

describe('UserGroupTreeComponent', () => {
  let component: UserGroupTreeComponent;
  let fixture: ComponentFixture<UserGroupTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
