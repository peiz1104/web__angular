import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasecostComponent } from './basecost.component';

describe('BasecostComponent', () => {
  let component: BasecostComponent;
  let fixture: ComponentFixture<BasecostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasecostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasecostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
