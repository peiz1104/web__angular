import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmessageComponent } from './documentmessage.component';

describe('DocumentmessageComponent', () => {
  let component: DocumentmessageComponent;
  let fixture: ComponentFixture<DocumentmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
