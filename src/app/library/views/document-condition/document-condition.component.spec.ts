import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentConditionComponent } from './document-condition.component';

describe('DocumentConditionComponent', () => {
  let component: DocumentConditionComponent;
  let fixture: ComponentFixture<DocumentConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
