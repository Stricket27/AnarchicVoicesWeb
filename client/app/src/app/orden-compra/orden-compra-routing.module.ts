import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdenCompraClienteAllComponent } from './orden-compra-cliente-all/orden-compra-cliente-all.component';
import { OrdenCompraClienteDetailComponent } from './orden-compra-cliente-detail/orden-compra-cliente-detail.component';
import { OrdenCompraVendedorAllComponent } from './orden-compra-vendedor-all/orden-compra-vendedor-all.component';
import { OrdenCompraVendedorDetailComponent } from './orden-compra-vendedor-detail/orden-compra-vendedor-detail.component';
import { OrdenCompraIndexComponent} from './orden-compra-index/orden-compra-index.component'
import { OrdenCompraPagoComponent} from './orden-compra-pago/orden-compra-pago.component'
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
{path: 'ordenCompra',canActivate:[AuthGuard], data:{roles:[3],}, component: OrdenCompraIndexComponent},
{path: 'orden-compra-cliente/all', component: OrdenCompraClienteAllComponent},
{path: 'orden-compra-cliente/:id',canActivate:[AuthGuard], data:{roles:[3],}, component: OrdenCompraClienteDetailComponent},
{path: 'orden-compra-pago/:id',canActivate:[AuthGuard], data:{roles:[3],}, component: OrdenCompraPagoComponent},
{path: 'orden-compra-vendedor/all', component: OrdenCompraVendedorAllComponent},
{path: 'orden-compra-vendedor/:id', component: OrdenCompraVendedorDetailComponent},

{path: 'ordenCompra/rGrafico', component: OrdenCompraGraficaComponent},
{path: 'ordenCompra/rPDF', component: OrdenCompraPdfComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdenCompraRoutingModule { }
