import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperUpdateComponent } from './paper-update.component';

describe('PaperUpdateComponent', () => {
  let component: PaperUpdateComponent;
  let fixture: ComponentFixture<PaperUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
