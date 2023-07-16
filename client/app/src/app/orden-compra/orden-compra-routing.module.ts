import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdenCompraAllComponent } from './orden-compra-all/orden-compra-all.component';
import { OrdenCompraDetailComponent } from './orden-compra-detail/orden-compra-detail.component';
import { OrdenCompravAllComponent } from './orden-comprav-all/orden-comprav-all.component';
import { OrdenCompravDetailComponent } from './orden-comprav-detail/orden-comprav-detail.component';

const routes: Routes = [
  {path:'orden-compra/all', component: OrdenCompraAllComponent},

  {path:'orden-compra/:id', component: OrdenCompraDetailComponent},
  {path:'orden-comprav/all', component: OrdenCompravAllComponent},
  {path:'orden-comprav/:id', component: OrdenCompravDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenCompraRoutingModule { }
