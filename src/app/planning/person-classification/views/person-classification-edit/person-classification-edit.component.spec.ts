import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationEditComponent } from './person-classification-edit.component';

describe('PersonClassificationEditComponent', () => {
  let component: PersonClassificationEditComponent;
  let fixture: ComponentFixture<PersonClassificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
