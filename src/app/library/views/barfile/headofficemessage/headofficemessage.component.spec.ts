import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofficemessageComponent } from './headofficemessage.component';

describe('HeadofficemessageComponent', () => {
  let component: HeadofficemessageComponent;
  let fixture: ComponentFixture<HeadofficemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofficemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofficemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
