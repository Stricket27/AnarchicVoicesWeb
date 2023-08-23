import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  administrador: boolean = false;
  vendedor:boolean=false;
  vendedorCliente:boolean=false;
  cliente:boolean=false;
  titulo:boolean=false;
  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService) {      
        this.qtyItems=this.cartService.quantityItems()
  }

  ngOnInit(): void {


    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      console.log(this.currentUser);
    
      if (this.currentUser && this.currentUser.user.detalle_usuarioTipo) {
       //SI TIENE 2 TIPOS DE USUARIOS
        if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
          //CLIENTE Y VENDEDOR
          if (
            this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2 &&
            this.currentUser.user.detalle_usuarioTipo[1].id_tipoUsuario === 3
          ) {
            this.titulo=true
            this.vendedorCliente = true;
            this.vendedor = true;
          } else {
            this.titulo=false
            this.vendedorCliente = false;
            this.vendedor = false;
          }
        } 
          // SI TIENE 1 TIPO DE USUARIO
        else if (this.currentUser.user.detalle_usuarioTipo.length === 1) {
          // VENDEDOR
          if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2) {
            this.vendedor = true;
            this.cliente=false;
            
          } 
          //ADMINISTRADOR
          else if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 1) {
            this.administrador = true;
            this.cliente = false;
            this.vendedor = false;
            this.vendedorCliente = false
          }
          //CLIENTE
          else {
            this.vendedor = false;
            this.cliente=true;
            console.log("cliente:"+this.cliente)
          }
        } else {
          // No cumple ningún caso, reiniciar los valores
          this.vendedor = false;
          this.titulo=false
          this.vendedorCliente = false;
          this.cliente=false;
        }
      } else {
        // Usuario no autenticado, reiniciar los valores
        this.vendedor = false;
        this.titulo=false
        this.vendedorCliente = false;
        this.cliente=false;
      }
    });
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
      
    )

    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value
     }
     
     )
    
    //  if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
    //   if (
    //     this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2 &&
    //     this.currentUser.user.detalle_usuarioTipo[1].id_tipoUsuario === 3
    //   ) {
    //     this.vendedorCliente = true;
    //   }
    // } else if (this.currentUser.user.detalle_usuarioTipo.length === 1) {
    //   if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2) {
    //     this.vendedor = true;
    //   }
    // }
    
  }
  login(){
    this.router.navigate(['user/login'])
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio'])
  }
}
