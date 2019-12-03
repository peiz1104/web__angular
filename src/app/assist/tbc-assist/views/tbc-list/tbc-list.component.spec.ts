import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcListComponent } from './tbc-list.component';

describe('TbcListComponent', () => {
  let component: TbcListComponent;
  let fixture: ComponentFixture<TbcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
