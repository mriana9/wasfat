import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRecipeItemComponent } from './users-recipe-item.component';

describe('UsersRecipeItemComponent', () => {
  let component: UsersRecipeItemComponent;
  let fixture: ComponentFixture<UsersRecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRecipeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
