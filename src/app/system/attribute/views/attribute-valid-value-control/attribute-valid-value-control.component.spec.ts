import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValidValueControlComponent } from './attribute-valid-value-control.component';

describe('AttributeValidValueControlComponent', () => {
  let component: AttributeValidValueControlComponent;
  let fixture: ComponentFixture<AttributeValidValueControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValidValueControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValidValueControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
