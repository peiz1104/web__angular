import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillistComponent } from './detaillist.component';

describe('DetaillistComponent', () => {
  let component: DetaillistComponent;
  let fixture: ComponentFixture<DetaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
