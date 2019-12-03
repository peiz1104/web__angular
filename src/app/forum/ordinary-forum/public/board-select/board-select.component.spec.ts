import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSelectComponent } from './board-select.component';

describe('BoardSelectComponent', () => {
  let component: BoardSelectComponent;
  let fixture: ComponentFixture<BoardSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
