import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImportWizardComponent } from './user-import-wizard.component';

describe('UserImportWizardComponent', () => {
  let component: UserImportWizardComponent;
  let fixture: ComponentFixture<UserImportWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserImportWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImportWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
