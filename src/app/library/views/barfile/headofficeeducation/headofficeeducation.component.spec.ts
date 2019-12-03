import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofficeeducationComponent } from './headofficeeducation.component';

describe('HeadofficeeducationComponent', () => {
  let component: HeadofficeeducationComponent;
  let fixture: ComponentFixture<HeadofficeeducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofficeeducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofficeeducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
