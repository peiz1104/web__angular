import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoAddGroupComponent } from './rco-add-group.component';

describe('RcoAddGroupComponent', () => {
  let component: RcoAddGroupComponent;
  let fixture: ComponentFixture<RcoAddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoAddGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
