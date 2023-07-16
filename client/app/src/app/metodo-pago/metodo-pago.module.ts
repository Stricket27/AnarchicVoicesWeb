import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodoPagoRoutingModule } from './metodo-pago-routing.module';
import { MetodoPagoAllComponent } from './metodo-pago-all/metodo-pago-all.component';
import { MetodoPagoFormComponent } from './metodo-pago-form/metodo-pago-form.component';
import { MetodoPagoIndexComponent } from './metodo-pago-index/metodo-pago-index.component';
import { MetodoPagoDiagComponent } from './metodo-pago-diag/metodo-pago-diag.component';


@NgModule({
  declarations: [
    MetodoPagoAllComponent,
    MetodoPagoFormComponent,
    MetodoPagoIndexComponent,
    MetodoPagoDiagComponent
  ],
  imports: [
    CommonModule,
    MetodoPagoRoutingModule
  ]
})
export class MetodoPagoModule { }
