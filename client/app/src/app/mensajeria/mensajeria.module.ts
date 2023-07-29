import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MensajeriaRoutingModule } from './mensajeria-routing.module';
import { MensajeriaAllComponent } from './mensajeria-all/mensajeria-all.component';
import { MensajeriaDetailComponent } from './mensajeria-detail/mensajeria-detail.component';
import { MensajeriaClienteFormComponent } from './mensajeria-cliente-form/mensajeria-cliente-form.component';
import { MensajeriaVendedorFormComponent } from './mensajeria-vendedor-form/mensajeria-vendedor-form.component';

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


@NgModule({
  declarations: [
    MensajeriaAllComponent,
    MensajeriaDetailComponent,
    MensajeriaClienteFormComponent,
    MensajeriaVendedorFormComponent,
  ],
  imports: [
    CommonModule,
    MensajeriaRoutingModule,

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
  ],
  providers: [DatePipe],
})

export class MensajeriaModule { }
