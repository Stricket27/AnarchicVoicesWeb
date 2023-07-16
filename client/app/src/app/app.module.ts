import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { CalificacionUsuarioModule } from './calificacion-usuario/calificacion-usuario.module';
import { DireccionModule } from './direccion/direccion.module';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ProductoModule } from './producto/producto.module';
import { FotografiaModule } from './fotografia/fotografia.module';
@NgModule({
declarations: [AppComponent],
imports: [
BrowserModule, // importar HttpClientModule después BrowserModule. 
// comunicarse con un servidor a través del protocolo HTTP 
HttpClientModule, // Debe agregar el import respectivo // importar otras 
//dependencias que sean necesario cargar en el componente principal.
// importar los módulos creados propios en orden 
CoreModule, 
ShareModule, 
HomeModule, 
UserModule, 
// al final el gestor de las rutas principal 
AppRoutingModule, CalificacionUsuarioModule, DireccionModule, MetodoPagoModule, OrdenCompraModule, ProductoModule, FotografiaModule,
],
providers: [ ],
bootstrap: [AppComponent],
})
export class AppModule {}
