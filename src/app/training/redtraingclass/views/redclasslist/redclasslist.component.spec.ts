import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedclasslistComponent } from './redclasslist.component';

describe('RedclasslistComponent', () => {
  let component: RedclasslistComponent;
  let fixture: ComponentFixture<RedclasslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedclasslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedclasslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
