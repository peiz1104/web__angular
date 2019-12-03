import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationFromComponent } from './person-classification-from.component';

describe('PersonClassificationFromComponent', () => {
  let component: PersonClassificationFromComponent;
  let fixture: ComponentFixture<PersonClassificationFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
