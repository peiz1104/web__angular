import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageaddComponent } from './stageadd.component';

describe('StageaddComponent', () => {
  let component: StageaddComponent;
  let fixture: ComponentFixture<StageaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
