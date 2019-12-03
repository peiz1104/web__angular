import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcerticateModalComponent } from './newcerticate-modal.component';

describe('NewcerticateModalComponent', () => {
  let component: NewcerticateModalComponent;
  let fixture: ComponentFixture<NewcerticateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcerticateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcerticateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
