import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMessageBoxComponent } from './system-message-box.component';

describe('SystemMessageBoxComponent', () => {
  let component: SystemMessageBoxComponent;
  let fixture: ComponentFixture<SystemMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
