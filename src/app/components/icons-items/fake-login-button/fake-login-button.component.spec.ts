import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeLoginButtonComponent } from './fake-login-button.component';

describe('FakeLoginButtonComponent', () => {
  let component: FakeLoginButtonComponent;
  let fixture: ComponentFixture<FakeLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeLoginButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
