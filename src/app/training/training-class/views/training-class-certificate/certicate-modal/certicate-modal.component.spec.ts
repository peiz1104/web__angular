import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerticateModalComponent } from './certicate-modal.component';

describe('CerticateModalComponent', () => {
  let component: CerticateModalComponent;
  let fixture: ComponentFixture<CerticateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerticateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerticateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
