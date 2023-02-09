import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemDetailsComponent } from './recipe-item-details.component';

describe('RecipeItemDetailsComponent', () => {
  let component: RecipeItemDetailsComponent;
  let fixture: ComponentFixture<RecipeItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
