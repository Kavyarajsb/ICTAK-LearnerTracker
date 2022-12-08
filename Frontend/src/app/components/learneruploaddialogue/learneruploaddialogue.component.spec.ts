import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearneruploaddialogueComponent } from './learneruploaddialogue.component';

describe('LearneruploaddialogueComponent', () => {
  let component: LearneruploaddialogueComponent;
  let fixture: ComponentFixture<LearneruploaddialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearneruploaddialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearneruploaddialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
