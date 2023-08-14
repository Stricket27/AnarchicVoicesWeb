import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MensajeriaAllComponent } from './mensajeria-all/mensajeria-all.component';
import { MensajeriaDetailComponent } from './mensajeria-detail/mensajeria-detail.component';
import { MensajeriaClienteFormComponent } from './mensajeria-cliente-form/mensajeria-cliente-form.component';
import { MensajeriaVendedorFormComponent } from './mensajeria-vendedor-form/mensajeria-vendedor-form.component';
import { MensajeriaVendedorAllComponent } from './mensajeria-vendedor-all/mensajeria-vendedor-all.component';

const routes: Routes = [
{path: 'mensajeria/all', component: MensajeriaAllComponent},
{path: 'mensajeria-vendedor/all', component: MensajeriaVendedorAllComponent},
{path: 'mensajeria-cliente/create', component: MensajeriaClienteFormComponent},
{path: 'mensajeria-vendedor/create', component: MensajeriaVendedorFormComponent},
{path: 'mensajeria/:id', component: MensajeriaDetailComponent},
{path: 'mensajeria-cliente/update/:id', component: MensajeriaClienteFormComponent},
{path: 'mensajeria-vendedor/update/:id', component: MensajeriaVendedorFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MensajeriaRoutingModule { }