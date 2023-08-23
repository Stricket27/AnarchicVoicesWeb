import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionUsuarioRoutingModule } from './calificacion-usuario-routing.module';
import { CalificacionUsuarioAllComponent } from './calificacion-usuario-all/calificacion-usuario-all.component';
import { CalificacionUsuarioIndexComponent } from './calificacion-usuario-index/calificacion-usuario-index.component';
import { CalificacionUsuarioFormComponent } from './calificacion-usuario-form/calificacion-usuario-form.component';
import { CalificacionUsuarioTop3Component } from './calificacion-usuario-top3/calificacion-usuario-top3.component';
import { CalificacionUsuarioTop5Component } from './calificacion-usuario-top5/calificacion-usuario-top5.component';


@NgModule({
  declarations: [
    CalificacionUsuarioAllComponent,
    CalificacionUsuarioIndexComponent,
    CalificacionUsuarioFormComponent,
    CalificacionUsuarioTop3Component,
    CalificacionUsuarioTop5Component
  ],
  imports: [
    CommonModule,
    CalificacionUsuarioRoutingModule
  ]
})
export class CalificacionUsuarioModule { }
