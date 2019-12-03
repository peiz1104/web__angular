import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationListComponent } from './person-classification-list.component';

describe('PersonClassificationListComponent', () => {
  let component: PersonClassificationListComponent;
  let fixture: ComponentFixture<PersonClassificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
