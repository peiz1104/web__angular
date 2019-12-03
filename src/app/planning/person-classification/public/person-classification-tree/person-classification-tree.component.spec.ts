import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassificationTreeComponent } from './person-classification-tree.component';

describe('PersonClassificationTreeComponent', () => {
  let component: PersonClassificationTreeComponent;
  let fixture: ComponentFixture<PersonClassificationTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonClassificationTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonClassificationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
