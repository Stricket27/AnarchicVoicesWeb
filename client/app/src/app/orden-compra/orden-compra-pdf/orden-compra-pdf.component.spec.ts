import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraPdfComponent } from './orden-compra-pdf.component';

describe('OrdenCompraPdfComponent', () => {
  let component: OrdenCompraPdfComponent;
  let fixture: ComponentFixture<OrdenCompraPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraPdfComponent]
    });
    fixture = TestBed.createComponent(OrdenCompraPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
