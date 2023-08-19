import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  isAutenticated: boolean;
  currentUser: any;
  cliente:any;

  categorias: any[] = [];
  filtrarDato: any;

  constructor(private gService:GenericService,
    private dialog:MatDialog,
    private cartService: CartService,
    private noti: NotificacionService, 
    private authService: AuthenticationService
    ){
    this.listaProductos(); 
    this.listaCategoria();
  }
  ngOnInit(): void {
    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    if (this.currentUser && this.currentUser.user.detalle_usuarioTipo) {
       
      if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
        if (
          this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2 &&
          this.currentUser.user.detalle_usuarioTipo[1].id_tipoUsuario === 3
        ) {
          this.cliente = true;
        } else {
          this.cliente = false;
        }
      } else if (this.currentUser.user.detalle_usuarioTipo.length === 1) {
        if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2|| this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 1) {
          this.cliente=false;
        } else {
          this.cliente=true;
        }
      } else {
        // No cumple ningún caso, reiniciar los valores
       
        this.cliente=false;
      }
    } else {
      // Usuario no autenticado, reiniciar los valores
     
      this.cliente=false;
    }
  }

  listaProductos(){
    this.gService.list('producto/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
    console.log(data);
    this.datos=data;
    this.filtrarDato = this.datos
    });
    }

    filtrarDatoPorNombre(texto: string){
      if(!texto){
        this.filtrarDato = this.datos;
      }
      else{
        this.filtrarDato = this.datos.filter((p) =>
        p?.nombre.toLowerCase().includes(texto.toLowerCase())
        );
      }
    }

    filtrarDatoPorCategoria(categoriaID: number){
      if(!categoriaID){
        this.filtrarDato = this.datos;
      }
      else{
        this.filtrarDato = this.datos.filter((p) => p.id_categoria == categoriaID
        );
      }
      console.log(this.filtrarDato)
    }

    listaCategoria(){
      this.gService
      .list('categoria/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.categorias = data;
      });
    }
    

    filtrarDatoPorOrden(ordenarPor: number){
      if(!ordenarPor || ordenarPor == 0 ){
        this.filtrarDato = this.datos.slice();
      }

      if(ordenarPor == 1){
        this.filtrarDato.sort((a, b) => b.precio - a.precio);
      }

      if(ordenarPor == 2){
        this.filtrarDato.sort((a, b) => a.precio - b.precio);
      }
    }

  detalleProducto(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
    id_producto:id
    };
    this.dialog.open(ProductoDiagComponent,dialogConfig);
  }

  comprar(id:number){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      data.cantidad= Number.MIN_VALUE
      //Agregar producto obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.noti.mensaje(
        'Orden',
        'Producto: '+data.nombre+ ' agregado a la orden',
        TipoMessage.success
      )
    });
  }
}
