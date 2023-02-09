import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaMasterCardComponent } from './ninja-master-card.component';

describe('NinjaMasterCardComponent', () => {
  let component: NinjaMasterCardComponent;
  let fixture: ComponentFixture<NinjaMasterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaMasterCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaMasterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
