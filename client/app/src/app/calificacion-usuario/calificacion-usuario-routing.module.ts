import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalificacionUsuarioTop3Component } from './calificacion-usuario-top3/calificacion-usuario-top3.component';
import { CalificacionUsuarioTop5Component } from './calificacion-usuario-top5/calificacion-usuario-top5.component';

const routes: Routes = [

   {path: 'calificacionUsuarioTop3/rPDF', component: CalificacionUsuarioTop3Component},
  {path: 'calificacionUsuarioTop5/rPDF', component: CalificacionUsuarioTop5Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionUsuarioRoutingModule { }
