import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchplanComponent } from './researchplan.component';

describe('ResearchplanComponent', () => {
  let component: ResearchplanComponent;
  let fixture: ComponentFixture<ResearchplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
