import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-orden-compra-form',
  templateUrl: './orden-compra-form.component.html',
  styleUrls: ['./orden-compra-form.component.css']
})
export class OrdenCompraFormComponent {
  usuarios: any[];
  usuariosCargados = false;
  metodoPago:any;
  datos:any;
  OrdenCInfo: any;
  submitted = false;
  respOrdenC: any;
  isAutenticated: boolean;
  idOrdenC: number = 0;
  currentUser: any;
  OrdenCForm: FormGroup;
  metodosList: any;
  pedidosList:any;
  direccionesList:any;
  selectedMetodoPago: number; // Holds the selected metodoPago ID
  selectedDireccion: number;
 
  selectedEstado: any;  // Holds the selected direccion ID
  destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(private gService:GenericService,
  private route: ActivatedRoute,private datePipe: DatePipe,private noti:NotificacionService,  private router: Router,private authService: AuthenticationService,
  private cartService: CartService, private activeRouter: ActivatedRoute, private fb: FormBuilder,){
    // this.formularioReactive();
    // this.listaUsuarios();
  let id=this.route.snapshot.paramMap.get('id');
  if(!isNaN(Number(id))){
  this.obtenerOrdenCompra(Number(id));
  // this.actualizarCompra(id)
  }

  this.activeRouter.params.subscribe((params:Params)=>{
    this.idOrdenC = params['id']
   
   
   })
  }
  ngOnInit() {
    // this.OrdenCForm = this.fb.group({
    //   metodoPago: [''] // Puedes inicializarlo con un valor predeterminado si es necesario
    // });
    
    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )

    // this.activeRouter.queryParams.subscribe((params:Params)=>{
    //   this.idOrdenC = params['id']})
  //     console.log("idC"+this.idOrdenC)
   }
  ngAfterViewInit(): void {
    
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
      if (this.currentUser) {
        this.listaMetodoPago(this.currentUser.user.id_usuario)
        this.listadirecciones(this.currentUser.user.id_usuario)
        this.listaPedidosUsuario(this.currentUser.user.id_usuario)
      }
    })
  
  }
 
  listaMetodoPago(id_usuario: number) {
    this.getMetodosPagoDelUsuario(id_usuario)
      .subscribe((metodoPago: any[]) => {
        this.gService.list('metodoPago/')
          .pipe(
            map((data: any[]) => {
              return metodoPago.length > 0
                ? data.filter(metodoP => metodoPago.some(mp => mp.id_metodoPago === metodoP.id_metodoPago))
                : data.filter(metodoP => metodoP.id_usuario === id_usuario);
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.metodosList = filteredData;
            
          });
      });
  }
  getMetodosPagoDelUsuario(id_usuario: number) {
    return this.gService.list('metodoPago/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(mp => mp.id_usuario === id_usuario))
      );
  }

  listadirecciones(id_usuario: number) {
    this.getdireccionesUsuario(id_usuario)
      .subscribe((direccion: any[]) => {
        this.gService.list('direccion/')
          .pipe(
            map((data: any[]) => {
              return direccion.length > 0
                ? data.filter(d => direccion.some(mp => mp.id_direccion === d.id_direccion))
                : data.filter(du => du.id_usuario === id_usuario);
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.direccionesList = filteredData;
            
          });
      });
  }
  getdireccionesUsuario(id_usuario: number) {
    return this.gService.list('direccion/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(du => du.id_usuario === id_usuario))
      );
  }

  listaPedidosUsuario(id_usuario: number) {
    this.getProductosUsuario(id_usuario)
   
      .subscribe((pedido: any[]) => {
        this.gService.list('ordenCompra/')
          .pipe(
            map((data: any[]) => {
              return pedido.length > 0
                ? data.filter(d => pedido.some(mp => mp.id_ordenCompra === d.id_ordenCompra))
                : data.filter(du => du.id_usuario === id_usuario);
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.pedidosList = filteredData;
            
          });
          console.log("pedidos"+this.getProductosUsuario(id_usuario))
      });
      
  }
  getProductosUsuario(id_usuario: number) {
    return this.gService.list('producto/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(pu => pu.id_usuario === id_usuario))
      );
  }
  
  getNombreUsuario(id: number): string {
  if (this.usuariosCargados) {
  const usuario = this.usuarios.find(u => u.id_usuario === id);
  return usuario ? usuario.nombre+" "+usuario.apellidos : '';
  } else {
  return '';
  }
  }

  formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy');
 
  }

  obtenerOrdenCompra(id:any){
  this.gService
  .get('ordenCompra',id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{
  
  this.datos=data; 
  this.metodoPago=data.id_metodoPago
  console.log("m "+this.metodoPago);
  });
  }
  // getMetodoPago(id: number): string {
   
  //   const mp = this.datos.find(u => u.id_metodoPago === id);
  //   console.log(mp)
  //   return mp ? mp.tipoPago.descripcion: '';
   
   
  //   }
  actualizarPedido(){
    // this.submitted = true;
    // if (this.OrdenCForm.invalid) {
    //   return;
    // }
    
    
   
    // let id=this.route.snapshot.paramMap.get('id');
   // let id=this.route.snapshot.paramMap.get('id');
   
      
   
    //  this.gService.update('ordenCompra', this.idOrdenC)
     
    //  .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
    //   this.datos = data;
    //   console.log("idC "+this.idOrdenC)
    //    this.noti.mensaje('Orden','Pago realizado con éxito',TipoMessage.info)
    //    this.router.navigate(['/orden-compra-cliente/all'], {
    //      queryParams: { update: 'true' }
    //    });
    //  });
   
   
    if (this.selectedEstado) {
      // Construct the updated object
      const updatedData = {
        id: this.idOrdenC,
        estado_actual:  this.selectedEstado
        // Add other properties you want to update
      };

      // Use the gService.update method to update the ordenCompra record
      this.gService.update('ordenCompra', updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log("idC " + this.idOrdenC);
          this.noti.mensaje('Pedido', 'Pedido actualizado', TipoMessage.info);
          this.router.navigate(['/orden-compra-cliente/all'], {
            queryParams: { update: 'true' }
          });
        });
    } else {
      this.noti.mensaje('Pedido', 'El proceso de edicion de pedido a fallado, verifique que se haya seleccionado una de las opciones de estado disponibles', TipoMessage.info);
      return;
    }
        
      
    }
    

   
   
   
    // this.gService.update('mensajeria', this.mensajeriaForm.value)
    //   .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
    //     this.respMensajeria = data;
    //     this.noti.mensaje('Mensaje','Mensaje editado',TipoMessage.info)
    //     this.router.navigate(['/mensajeria/all'], {
    //       queryParams: { update: 'true' }
    //     });
    //   });
  

  ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
   } 

   
}
