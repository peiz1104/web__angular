import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharecostComponent } from './sharecost.component';

describe('SharecostComponent', () => {
  let component: SharecostComponent;
  let fixture: ComponentFixture<SharecostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharecostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharecostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
