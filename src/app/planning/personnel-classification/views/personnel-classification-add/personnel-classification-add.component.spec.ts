import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelClassificationAddComponent } from './personnel-classification-add.component';

describe('PersonnelClassificationAddComponent', () => {
  let component: PersonnelClassificationAddComponent;
  let fixture: ComponentFixture<PersonnelClassificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelClassificationAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelClassificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
