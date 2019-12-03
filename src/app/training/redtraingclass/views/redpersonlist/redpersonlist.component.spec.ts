import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedpersonlistComponent } from './redpersonlist.component';

describe('RedpersonlistComponent', () => {
  let component: RedpersonlistComponent;
  let fixture: ComponentFixture<RedpersonlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedpersonlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedpersonlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
