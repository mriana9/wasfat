import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSharedItemComponent } from './remove-shared-item.component';

describe('RemoveSharedItemComponent', () => {
  let component: RemoveSharedItemComponent;
  let fixture: ComponentFixture<RemoveSharedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveSharedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveSharedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
