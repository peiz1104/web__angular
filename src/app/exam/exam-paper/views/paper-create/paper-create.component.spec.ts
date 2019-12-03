import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperCreateComponent } from './paper-create.component';

describe('PaperCreateComponent', () => {
  let component: PaperCreateComponent;
  let fixture: ComponentFixture<PaperCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
