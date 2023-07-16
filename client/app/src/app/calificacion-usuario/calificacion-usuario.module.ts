import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionUsuarioRoutingModule } from './calificacion-usuario-routing.module';
import { CalificacionUsuarioAllComponent } from './calificacion-usuario-all/calificacion-usuario-all.component';
import { CalificacionUsuarioIndexComponent } from './calificacion-usuario-index/calificacion-usuario-index.component';
import { CalificacionUsuarioFormComponent } from './calificacion-usuario-form/calificacion-usuario-form.component';


@NgModule({
  declarations: [
    CalificacionUsuarioAllComponent,
    CalificacionUsuarioIndexComponent,
    CalificacionUsuarioFormComponent
  ],
  imports: [
    CommonModule,
    CalificacionUsuarioRoutingModule
  ]
})
export class CalificacionUsuarioModule { }
