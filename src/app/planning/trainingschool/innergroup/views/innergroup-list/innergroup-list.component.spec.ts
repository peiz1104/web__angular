import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerGroupListComponent } from './innergroup-list.component';

describe('InnerGroupListComponent', () => {
  let component: InnerGroupListComponent;
  let fixture: ComponentFixture<InnerGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InnerGroupListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
