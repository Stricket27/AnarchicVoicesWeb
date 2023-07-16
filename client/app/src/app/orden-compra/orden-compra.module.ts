import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenCompraRoutingModule } from './orden-compra-routing.module';
import { OrdenCompraClienteAllComponent } from './orden-compra-cliente-all/orden-compra-cliente-all.component';
import { OrdenCompraClienteDetailComponent } from './orden-compra-cliente-detail/orden-compra-cliente-detail.component';
import { OrdenCompraClienteDiagComponent } from './orden-compra-cliente-diag/orden-compra-cliente-diag.component';
import { OrdenCompraVendedorAllComponent } from './orden-compra-vendedor-all/orden-compra-vendedor-all.component';
import { OrdenCompraVendedorDetailComponent } from './orden-compra-vendedor-detail/orden-compra-vendedor-detail.component';


@NgModule({
  declarations: [
  
    OrdenCompraClienteAllComponent,
       OrdenCompraClienteDetailComponent,
       OrdenCompraClienteDiagComponent,
       OrdenCompraVendedorAllComponent,
       OrdenCompraVendedorDetailComponent
  ],
  imports: [
    CommonModule,
    OrdenCompraRoutingModule
  ]
})
export class OrdenCompraModule { }
