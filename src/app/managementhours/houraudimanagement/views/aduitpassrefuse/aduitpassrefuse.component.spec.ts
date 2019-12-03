import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AduitpassrefuseComponent } from './aduitpassrefuse.component';

describe('AduitpassrefuseComponent', () => {
  let component: AduitpassrefuseComponent;
  let fixture: ComponentFixture<AduitpassrefuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AduitpassrefuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AduitpassrefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
