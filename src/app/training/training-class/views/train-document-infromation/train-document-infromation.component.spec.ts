import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDocumentInfromationComponent } from './train-document-infromation.component';

describe('TrainDocumentInfromationComponent', () => {
  let component: TrainDocumentInfromationComponent;
  let fixture: ComponentFixture<TrainDocumentInfromationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainDocumentInfromationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainDocumentInfromationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
