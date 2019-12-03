import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerlevelComponent } from './lowerlevel.component';

describe('LowerlevelComponent', () => {
  let component: LowerlevelComponent;
  let fixture: ComponentFixture<LowerlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowerlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowerlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
