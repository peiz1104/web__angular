import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedpromotionComponent } from './proposedpromotion.component';

describe('ProposedpromotionComponent', () => {
  let component: ProposedpromotionComponent;
  let fixture: ComponentFixture<ProposedpromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedpromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
