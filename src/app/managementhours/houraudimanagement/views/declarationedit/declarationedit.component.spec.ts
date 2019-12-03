import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationeditComponent } from './declarationedit.component';

describe('DeclarationeditComponent', () => {
  let component: DeclarationeditComponent;
  let fixture: ComponentFixture<DeclarationeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
