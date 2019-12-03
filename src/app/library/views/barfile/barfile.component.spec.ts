import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarfileComponent } from './barfile.component';

describe('BarfileComponent', () => {
  let component: BarfileComponent;
  let fixture: ComponentFixture<BarfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
