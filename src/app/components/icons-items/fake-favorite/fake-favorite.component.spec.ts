import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeFavoriteComponent } from './fake-favorite.component';

describe('FakeFavoriteComponent', () => {
  let component: FakeFavoriteComponent;
  let fixture: ComponentFixture<FakeFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
