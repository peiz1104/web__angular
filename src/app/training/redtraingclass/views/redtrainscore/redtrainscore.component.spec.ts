import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedtrainscoreComponent } from './redtrainscore.component';

describe('RedtrainscoreComponent', () => {
  let component: RedtrainscoreComponent;
  let fixture: ComponentFixture<RedtrainscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedtrainscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedtrainscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
