import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouruserlookupComponent } from './houruserlookup.component';

describe('HouruserlookupComponent', () => {
  let component: HouruserlookupComponent;
  let fixture: ComponentFixture<HouruserlookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouruserlookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouruserlookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
