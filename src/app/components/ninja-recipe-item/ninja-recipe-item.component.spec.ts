import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaRecipeItemComponent } from './ninja-recipe-item.component';

describe('NinjaRecipeItemComponent', () => {
  let component: NinjaRecipeItemComponent;
  let fixture: ComponentFixture<NinjaRecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaRecipeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaRecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
