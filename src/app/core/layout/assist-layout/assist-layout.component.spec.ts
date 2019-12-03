import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistLayoutComponent } from './assist-layout.component';

describe('AssistLayoutComponent', () => {
  let component: AssistLayoutComponent;
  let fixture: ComponentFixture<AssistLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
