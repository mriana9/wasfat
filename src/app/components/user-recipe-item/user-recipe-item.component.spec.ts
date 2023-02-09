import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeItemComponent } from './user-recipe-item.component';

describe('UserRecipeItemComponent', () => {
  let component: UserRecipeItemComponent;
  let fixture: ComponentFixture<UserRecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecipeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
