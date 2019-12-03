import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMessageBoxAddComponent } from './system-message-box-add.component';

describe('SystemMessageBoxAddComponent', () => {
  let component: SystemMessageBoxAddComponent;
  let fixture: ComponentFixture<SystemMessageBoxAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMessageBoxAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMessageBoxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
