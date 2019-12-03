import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImportChinaLifeComponent } from './user-import-china-life.component';

describe('UserImportChinaLifeComponent', () => {
  let component: UserImportChinaLifeComponent;
  let fixture: ComponentFixture<UserImportChinaLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserImportChinaLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImportChinaLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
