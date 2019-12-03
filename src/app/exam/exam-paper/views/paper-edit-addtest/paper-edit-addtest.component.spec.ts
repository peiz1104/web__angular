import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditAddtestComponent } from './paper-edit-addtest.component';

describe('PaperEditAddtestComponent', () => {
  let component: PaperEditAddtestComponent;
  let fixture: ComponentFixture<PaperEditAddtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperEditAddtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperEditAddtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
