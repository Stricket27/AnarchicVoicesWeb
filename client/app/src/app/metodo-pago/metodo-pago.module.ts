import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodoPagoRoutingModule } from './metodo-pago-routing.module';
import { MetodoPagoAllComponent } from './metodo-pago-all/metodo-pago-all.component';
import { MetodoPagoFormComponent } from './metodo-pago-form/metodo-pago-form.component';
import { MetodoPagoIndexComponent } from './metodo-pago-index/metodo-pago-index.component';
import { MetodoPagoDiagComponent } from './metodo-pago-diag/metodo-pago-diag.component';

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
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    MetodoPagoAllComponent,
    MetodoPagoFormComponent,
    MetodoPagoIndexComponent,
    MetodoPagoDiagComponent
  ],
  imports: [
    CommonModule,
    MetodoPagoRoutingModule,

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
    ReactiveFormsModule,
    NgxDropzoneModule,
    CarouselModule,
    MatChipsModule
  ]
})
export class MetodoPagoModule { }
