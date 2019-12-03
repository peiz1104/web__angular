import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigFooterComponent } from './home-template-config-footer.component';

describe('HomeTemplateConfigFooterComponent', () => {
  let component: HomeTemplateConfigFooterComponent;
  let fixture: ComponentFixture<HomeTemplateConfigFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
