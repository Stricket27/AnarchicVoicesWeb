import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionUsuarioRoutingModule } from './calificacion-usuario-routing.module';
import { CalificacionUsuarioAllComponent } from './calificacion-usuario-all/calificacion-usuario-all.component';
import { CalificacionUsuarioIndexComponent } from './calificacion-usuario-index/calificacion-usuario-index.component';
import { CalificacionUsuarioFormComponent } from './calificacion-usuario-form/calificacion-usuario-form.component';
import { CalificacionUsuarioTop3Component } from './calificacion-usuario-top3/calificacion-usuario-top3.component';
import { CalificacionUsuarioTop5Component } from './calificacion-usuario-top5/calificacion-usuario-top5.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
    CalificacionUsuarioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class CalificacionUsuarioModule { }
