import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    InicioComponent,
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class HomeModule { }
