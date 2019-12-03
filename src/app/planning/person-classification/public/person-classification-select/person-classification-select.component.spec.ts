import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationSelectComponent } from './person-classification-select.component';

describe('PersonClassificationSelectComponent', () => {
  let component: PersonClassificationSelectComponent;
  let fixture: ComponentFixture<PersonClassificationSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
