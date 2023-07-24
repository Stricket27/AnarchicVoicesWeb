import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotografiaAllComponent } from './fotografia-all.component';

describe('FotografiaAllComponent', () => {
  let component: FotografiaAllComponent;
  let fixture: ComponentFixture<FotografiaAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotografiaAllComponent]
    });
    fixture = TestBed.createComponent(FotografiaAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
