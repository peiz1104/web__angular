import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCallInterfaceComponent } from './manual-call-interface.component';

describe('ManualCallInterfaceComponent', () => {
  let component: ManualCallInterfaceComponent;
  let fixture: ComponentFixture<ManualCallInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualCallInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCallInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
