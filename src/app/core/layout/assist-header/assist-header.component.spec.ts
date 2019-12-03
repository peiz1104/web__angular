import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistHeaderComponent } from './assist-header.component';

describe('AssistHeaderComponent', () => {
  let component: AssistHeaderComponent;
  let fixture: ComponentFixture<AssistHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
