import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarfilechooseugComponent } from './barfilechooseug.component';

describe('BarfilechooseugComponent', () => {
  let component: BarfilechooseugComponent;
  let fixture: ComponentFixture<BarfilechooseugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarfilechooseugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarfilechooseugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
