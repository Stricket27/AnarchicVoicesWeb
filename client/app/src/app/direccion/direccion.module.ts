import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DireccionRoutingModule } from './direccion-routing.module';
import { DireccionIndexComponent } from './direccion-index/direccion-index.component';
import { DireccionFormComponent } from './direccion-form/direccion-form.component';
import { DireccionDiagComponent } from './direccion-diag/direccion-diag.component';


@NgModule({
  declarations: [
  
    DireccionIndexComponent,
       DireccionFormComponent,
       DireccionDiagComponent
  ],
  imports: [
    CommonModule,
    DireccionRoutingModule
  ]
})
export class DireccionModule { }
