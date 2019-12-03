import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoLinkComponent } from './rco-link.component';

describe('RcoLinkComponent', () => {
  let component: RcoLinkComponent;
  let fixture: ComponentFixture<RcoLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
