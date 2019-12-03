import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchstaffingComponent } from './researchstaffing.component';

describe('ResearchstaffingComponent', () => {
  let component: ResearchstaffingComponent;
  let fixture: ComponentFixture<ResearchstaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchstaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchstaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
