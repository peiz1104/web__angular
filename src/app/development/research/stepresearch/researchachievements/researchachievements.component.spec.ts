import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchachievementsComponent } from './researchachievements.component';

describe('ResearchachievementsComponent', () => {
  let component: ResearchachievementsComponent;
  let fixture: ComponentFixture<ResearchachievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchachievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchachievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
