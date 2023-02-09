import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShareBoxComponent } from './user-share-box.component';

describe('UserShareBoxComponent', () => {
  let component: UserShareBoxComponent;
  let fixture: ComponentFixture<UserShareBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShareBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShareBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
