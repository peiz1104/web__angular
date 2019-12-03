import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessListComponent } from './assess-list.component';

describe('AssessListComponent', () => {
  let component: AssessListComponent;
  let fixture: ComponentFixture<AssessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
