import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditComponent } from './paper-edit.component';

describe('PaperEditComponent', () => {
  let component: PaperEditComponent;
  let fixture: ComponentFixture<PaperEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
