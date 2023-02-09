import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCocktailItemComponent } from './user-cocktail-item.component';

describe('UserCocktailItemComponent', () => {
  let component: UserCocktailItemComponent;
  let fixture: ComponentFixture<UserCocktailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCocktailItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCocktailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
