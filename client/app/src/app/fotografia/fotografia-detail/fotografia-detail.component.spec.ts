import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotografiaDetailComponent } from './fotografia-detail.component';

describe('FotografiaDetailComponent', () => {
  let component: FotografiaDetailComponent;
  let fixture: ComponentFixture<FotografiaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotografiaDetailComponent]
    });
    fixture = TestBed.createComponent(FotografiaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
