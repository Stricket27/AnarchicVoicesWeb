import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-orden-compra-index',
  templateUrl: './orden-compra-index.component.html',
  styleUrls: ['./orden-compra-index.component.css']
})
export class OrdenCompraIndexComponent {
  total = 0;
  totalIVA=0;
  fecha = Date.now();
  qtyItems = 0;
  isAutenticated: boolean;
  currentUser: any;
  cliente:any;
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'sub_total','acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,private authService: AuthenticationService, private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    
   
   this.cartService.currentDataCart$.subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
   })
   this.total=this.cartService.getTotal()
   this.totalIVA=this.cartService.getTotalIVA()
  
   console.log(this.totalIVA)
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    this.totalIVA=this.cartService.getTotalIVA()
   
  //  this.noti.mensaje('Orden',
  //   'Cantidad actualizada: '+item.cantidad,
  //   TipoMessage.info) 
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.totalIVA=this.cartService.getTotalIVA()
    this.noti.mensaje('Orden',
    'Producto eliminado',
    TipoMessage.warning)
  }

  registrarOrden() {
    const itemsCarrito = this.cartService.getItems;
   if(itemsCarrito !== null && itemsCarrito.length > 0){
      //Obtener los items del carrito de compras
      let itemsCarrito=this.cartService.getItems;
      //Armar la estructura de la tabla intermedia
      //[{'videojuegoId':valor, 'cantidad':valor}]
      let detalles=itemsCarrito.map(
        x=>({
          ['id_producto']:x.idItem,
          ['cantidad']: x.cantidad,
          'sub_total': this.cartService.getTotal().toString(),
          'estado_actual': 'Pendiente',
        })
      )
      //Datos para el API
      let infoOrden={
        'fecha': new Date(this.fecha),
        'lineaDetalle':detalles,
      
        'monto_total': this.cartService.getTotalIVA(),
        'estado_actual': 'Pendiente',
        'direccion':null,
        'usuario':this.currentUser.user.id_usuario,
        'metodoPago':null,
        
      }
      this.gService.create('ordenCompra',infoOrden)
      .subscribe((respuesta:any)=>{
        this.noti.mensaje('Orden',
        'Orden registrada #'+respuesta.id_ordenCompra,
        TipoMessage.success)

        this.cartService.deleteCart();
        this.total=this.cartService.getTotal();
        this.totalIVA=this.cartService.getTotalIVA()
        this.router.navigate(['/orden-compra-pago',respuesta.id_ordenCompra],
        {
        relativeTo:this.route
        })
        
        console.log(respuesta)
      })
   }else{
    this.noti.mensaje('Orden',
    'Agregue productos a la orden',
    TipoMessage.warning)
   }
  }
}
