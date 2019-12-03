import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttchmentlistComponent } from './attchmentlist.component';

describe('AttchmentlistComponent', () => {
  let component: AttchmentlistComponent;
  let fixture: ComponentFixture<AttchmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttchmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttchmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
