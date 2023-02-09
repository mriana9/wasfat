import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaCardDetailsComponent } from './ninja-card-details.component';

describe('NinjaCardDetailsComponent', () => {
  let component: NinjaCardDetailsComponent;
  let fixture: ComponentFixture<NinjaCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
