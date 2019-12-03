import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupWizardComponent } from './user-group-wizard.component';

describe('UserGroupImportComponent', () => {
  let component: UserGroupWizardComponent;
  let fixture: ComponentFixture<UserGroupWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
