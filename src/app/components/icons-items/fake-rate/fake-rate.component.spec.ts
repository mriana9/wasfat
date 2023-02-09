import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeRateComponent } from './fake-rate.component';

describe('FakeRateComponent', () => {
  let component: FakeRateComponent;
  let fixture: ComponentFixture<FakeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
