import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchmessgaeComponent } from './researchmessgae.component';

describe('ResearchmessgaeComponent', () => {
  let component: ResearchmessgaeComponent;
  let fixture: ComponentFixture<ResearchmessgaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchmessgaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmessgaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
