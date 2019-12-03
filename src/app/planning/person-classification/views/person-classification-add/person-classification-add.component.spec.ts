import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationAddComponent } from './person-classification-add.component';

describe('PersonClassificationAddComponent', () => {
  let component: PersonClassificationAddComponent;
  let fixture: ComponentFixture<PersonClassificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
