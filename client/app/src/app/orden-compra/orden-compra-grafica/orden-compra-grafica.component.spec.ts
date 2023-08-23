import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraGraficaComponent } from './orden-compra-grafica.component';

describe('OrdenCompraGraficaComponent', () => {
  let component: OrdenCompraGraficaComponent;
  let fixture: ComponentFixture<OrdenCompraGraficaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraGraficaComponent]
    });
    fixture = TestBed.createComponent(OrdenCompraGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
