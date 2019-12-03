import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoItemComponent } from './rco-item.component';

describe('RcoItemComponent', () => {
  let component: RcoItemComponent;
  let fixture: ComponentFixture<RcoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
