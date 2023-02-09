import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaCocktailItemComponent } from './ninja-cocktail-item.component';

describe('NinjaCocktailItemComponent', () => {
  let component: NinjaCocktailItemComponent;
  let fixture: ComponentFixture<NinjaCocktailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaCocktailItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaCocktailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
