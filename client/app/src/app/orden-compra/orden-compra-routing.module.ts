import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdenCompraClienteAllComponent } from './orden-compra-cliente-all/orden-compra-cliente-all.component';
import { OrdenCompraClienteDetailComponent } from './orden-compra-cliente-detail/orden-compra-cliente-detail.component';
import { OrdenCompraVendedorAllComponent } from './orden-compra-vendedor-all/orden-compra-vendedor-all.component';
import { OrdenCompraVendedorDetailComponent } from './orden-compra-vendedor-detail/orden-compra-vendedor-detail.component';

const routes: Routes = [
{path: 'orden-compra-cliente/all', component: OrdenCompraClienteAllComponent},
{path: 'orden-compra-cliente/:id', component: OrdenCompraClienteDetailComponent},

{path: 'orden-compra-vendedor/all', component: OrdenCompraVendedorAllComponent},
{path: 'orden-compra-vendedor/:id', component: OrdenCompraVendedorDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdenCompraRoutingModule { }
