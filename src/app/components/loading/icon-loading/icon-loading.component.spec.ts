import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLoadingComponent } from './icon-loading.component';

describe('IconLoadingComponent', () => {
  let component: IconLoadingComponent;
  let fixture: ComponentFixture<IconLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
