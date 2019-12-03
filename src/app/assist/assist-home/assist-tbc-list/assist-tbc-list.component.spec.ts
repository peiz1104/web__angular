import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistTbcListComponent } from './assist-tbc-list.component';

describe('AssistTbcListComponent', () => {
  let component: AssistTbcListComponent;
  let fixture: ComponentFixture<AssistTbcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistTbcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistTbcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
