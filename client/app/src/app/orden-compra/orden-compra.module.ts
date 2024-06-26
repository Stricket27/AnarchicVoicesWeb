import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrdenCompraRoutingModule } from './orden-compra-routing.module';
import { OrdenCompraClienteAllComponent } from './orden-compra-cliente-all/orden-compra-cliente-all.component';
import { OrdenCompraClienteDetailComponent } from './orden-compra-cliente-detail/orden-compra-cliente-detail.component';
import { OrdenCompraClienteDiagComponent } from './orden-compra-cliente-diag/orden-compra-cliente-diag.component';
import { OrdenCompraVendedorAllComponent } from './orden-compra-vendedor-all/orden-compra-vendedor-all.component';
import { OrdenCompraVendedorDetailComponent } from './orden-compra-vendedor-detail/orden-compra-vendedor-detail.component';
import { OrdenCompraIndexComponent } from './orden-compra-index/orden-compra-index.component';
import { OrdenCompraPagoComponent } from './orden-compra-pago/orden-compra-pago.component';
import { OrdenCompraGraficaComponent } from './orden-compra-grafica/orden-compra-grafica.component';
import { OrdenCompraPdfComponent } from './orden-compra-pdf/orden-compra-pdf.component';
import { OrdenCompraFormComponent } from './orden-compra-form/orden-compra-form.component';

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




@NgModule({
  declarations: [
    OrdenCompraClienteAllComponent,
    OrdenCompraClienteDetailComponent,
    OrdenCompraClienteDiagComponent,
    OrdenCompraVendedorAllComponent,
    OrdenCompraVendedorDetailComponent,
    OrdenCompraIndexComponent,
    OrdenCompraPagoComponent,
    OrdenCompraGraficaComponent,
    OrdenCompraPdfComponent,
    OrdenCompraFormComponent,
  ],
  imports: [
    CommonModule,
    OrdenCompraRoutingModule,

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
    FormsModule, ReactiveFormsModule,
  ],
  providers: [DatePipe],
})

export class OrdenCompraModule { }
