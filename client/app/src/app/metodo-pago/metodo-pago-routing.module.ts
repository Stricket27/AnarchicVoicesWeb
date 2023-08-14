import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetodoPagoFormComponent } from './metodo-pago-form/metodo-pago-form.component';
import { MetodoPagoIndexComponent } from './metodo-pago-index/metodo-pago-index.component';

const routes: Routes = [

  {path: 'metodoPago', component: MetodoPagoIndexComponent},
  {path: 'metodoPago/create', component: MetodoPagoFormComponent},
  {path: 'metodoPago/update/:id', component: MetodoPagoFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetodoPagoRoutingModule { }
