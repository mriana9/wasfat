import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCocktailItemComponent } from './users-cocktail-item.component';

describe('UsersCocktailItemComponent', () => {
  let component: UsersCocktailItemComponent;
  let fixture: ComponentFixture<UsersCocktailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCocktailItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCocktailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
