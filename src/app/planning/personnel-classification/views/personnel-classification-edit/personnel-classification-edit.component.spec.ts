import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelClassificationEditComponent } from './personnel-classification-edit.component';

describe('PersonnelClassificationEditComponent', () => {
  let component: PersonnelClassificationEditComponent;
  let fixture: ComponentFixture<PersonnelClassificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelClassificationEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelClassificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
