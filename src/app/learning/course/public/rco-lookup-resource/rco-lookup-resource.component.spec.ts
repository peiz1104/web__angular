import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoLookupResourceComponent } from './rco-lookup-resource.component';

describe('RcoLookupResourceComponent', () => {
  let component: RcoLookupResourceComponent;
  let fixture: ComponentFixture<RcoLookupResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoLookupResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoLookupResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
