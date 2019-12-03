import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchfeemanageComponent } from './researchfeemanage.component';

describe('ResearchfeemanageComponent', () => {
  let component: ResearchfeemanageComponent;
  let fixture: ComponentFixture<ResearchfeemanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchfeemanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchfeemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
