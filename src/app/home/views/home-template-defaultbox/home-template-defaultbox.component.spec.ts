import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateDefaultboxComponent } from './home-template-defaultbox.component';

describe('HomeTemplateDefaultboxComponent', () => {
  let component: HomeTemplateDefaultboxComponent;
  let fixture: ComponentFixture<HomeTemplateDefaultboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateDefaultboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateDefaultboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
