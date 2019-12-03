import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperHomeComponent } from './paper-home.component';

describe('PaperHomeComponent', () => {
  let component: PaperHomeComponent;
  let fixture: ComponentFixture<PaperHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
