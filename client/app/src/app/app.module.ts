import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CalificacionUsuarioModule } from './calificacion-usuario/calificacion-usuario.module';
import { DireccionModule } from './direccion/direccion.module';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ProductoModule } from './producto/producto.module';
import { FotografiaModule } from './fotografia/fotografia.module';
import { MensajeriaModule } from './mensajeria/mensajeria.module';

import { ToastrModule } from 'ngx-toastr';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule, // importar HttpClientModule después BrowserModule. 
  BrowserAnimationsModule,
  // comunicarse con un servidor a través del protocolo HTTP 
  HttpClientModule, // Debe agregar el import respectivo // importar otras 
  //dependencias que sean necesario cargar en el componente principal.
  ToastrModule.forRoot(),
  // importar los módulos creados propios en orden 
  CoreModule, 
  ShareModule, 
  HomeModule, 
  UserModule, 
  CalificacionUsuarioModule,
  DireccionModule, 
  MetodoPagoModule, 
  OrdenCompraModule,
  ProductoModule, 
  FotografiaModule,
  MensajeriaModule,
  
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  // al final el gestor de las rutas principal 
  AppRoutingModule,
  CarouselModule.forRoot(), 
  
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService, multi: true
    }],
  bootstrap: [AppComponent],
  })
  export class AppModule {}
  