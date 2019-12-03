import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingReglistComponent } from './offering-reglist.component';

describe('OfferingReglistComponent', () => {
  let component: OfferingReglistComponent;
  let fixture: ComponentFixture<OfferingReglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingReglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingReglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
