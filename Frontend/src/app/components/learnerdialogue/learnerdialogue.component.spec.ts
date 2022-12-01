import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerdialogueComponent } from './learnerdialogue.component';

describe('LearnerdialogueComponent', () => {
  let component: LearnerdialogueComponent;
  let fixture: ComponentFixture<LearnerdialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerdialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnerdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
