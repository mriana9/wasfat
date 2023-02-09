import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeShareComponent } from './fake-share.component';

describe('FakeShareComponent', () => {
  let component: FakeShareComponent;
  let fixture: ComponentFixture<FakeShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
