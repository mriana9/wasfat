import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailItemDetailsComponent } from './cocktail-item-details.component';

describe('CocktailItemDetailsComponent', () => {
  let component: CocktailItemDetailsComponent;
  let fixture: ComponentFixture<CocktailItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocktailItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
