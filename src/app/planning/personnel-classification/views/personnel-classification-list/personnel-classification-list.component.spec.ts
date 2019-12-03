import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelClassificationListComponent } from './personnel-classification-list.component';

describe('PersonnelClassificationListComponent', () => {
  let component: PersonnelClassificationListComponent;
  let fixture: ComponentFixture<PersonnelClassificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelClassificationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
