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
  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService) {      
        this.qtyItems=this.cartService.quantityItems()
  }

  ngOnInit(): void {


    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )

    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value
     })
  }
  login(){
    this.router.navigate(['user/login'])
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio'])
  }
}
