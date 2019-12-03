import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcExtendListComponent } from './tbc-extend-list.component';

describe('TbcExtendListComponent', () => {
  let component: TbcExtendListComponent;
  let fixture: ComponentFixture<TbcExtendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcExtendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcExtendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
