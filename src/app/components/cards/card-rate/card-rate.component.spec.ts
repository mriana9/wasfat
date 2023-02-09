import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRateComponent } from './card-rate.component';

describe('CardRateComponent', () => {
  let component: CardRateComponent;
  let fixture: ComponentFixture<CardRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
