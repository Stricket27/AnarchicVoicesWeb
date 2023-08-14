
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService,TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-mensajeria-cliente-form',
  templateUrl: './mensajeria-cliente-form.component.html',
  styleUrls: ['./mensajeria-cliente-form.component.css']
})
export class MensajeriaClienteFormComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  productosList: any;
  usuariosList:any;
  productId: number;
  mensajeriaInfo: any;
  respMensajeria: any;
  submitted = false;
  mensajeriaForm: FormGroup;
  idMensajeria: number = 0;
  isCreate: boolean = true;
  isAutenticated: boolean;
  currentUser: any;
  isOwner:boolean= false;
  tieneRespuesta:boolean=false;
  noEditable: boolean=false;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti:NotificacionService, private authService: AuthenticationService
    )
    {
    this.formularioReactive();
    this.listaProductos();
    this.listaUsuarios();
    
    }
  
  ngOnInit(): void {
    
    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
   
    this.activeRouter.queryParams.subscribe(queryParams => {
      const idProductoParam = queryParams['id_producto'];
      if (idProductoParam && !isNaN(parseInt(idProductoParam))) {
        this.productId = parseInt(idProductoParam);
        console.log('Product ID:', this.productId);
       
       
      }
      console.log(this.currentUser.user.nombre)
      
    });
   
    
  //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMensajeria = params['id'];
      
      if(this.idMensajeria!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
        //Obtener el mensaje del API
        this.gService.get('mensajeria',this.idMensajeria).pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.mensajeriaInfo=data;
         
          //Establecer los valores del formulario mensajeria
          if (this.mensajeriaInfo&&this.mensajeriaInfo.respuesta!=null) {
           this.tieneRespuesta=true;
          }
          this.mensajeriaForm.setValue({
            id:this.mensajeriaInfo.id_mensajeria,
            asunto:this.mensajeriaInfo.asunto,
            mensaje:this.mensajeriaInfo.mensaje,
            respuesta:this.mensajeriaInfo.respuesta,
            estado_actual:this.mensajeriaInfo.estado_actual,
            producto:this.productId,
            usuario:this.mensajeriaInfo.usuario.nombre+" "+this.mensajeriaInfo.usuario.apellidos,
          })
        });
      }
      if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario===2) {
        this.noEditable=true;
        console.log("editable "+this.noEditable)
      }
     
     

      this.gService
        .get("producto", this.productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          let producto = data;
          if (producto.id_usuario === this.currentUser.user.id_usuario) {
            this.isOwner=true;
            console.log(this.isOwner)
                     }
        });
       
    });
   if(this.isCreate){
    this.mensajeriaForm.patchValue({usuario:this.currentUser.user.nombre+" "+this.currentUser.user.apellidos})
   }
    this.listaProductos();
    
   
    
  }
  
    formularioReactive() {
    this.mensajeriaForm=this.fb.group({
    id:[null,null],
    respuesta:[null,Validators.compose([Validators.minLength(10),Validators.maxLength(100)])],
    
    estado_actual: ["Pendiente"],
    asunto:[null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(100)])],
    mensaje: [null, Validators.compose([Validators.required,Validators.minLength(20),Validators.maxLength(100)])],
    producto: [null, Validators.required],
    usuario: [null, Validators.required],
    })
  
    }
    
    getProductDescription(productId: number): string {
      if (!this.productosList) return '';
  
      const selectedProduct = this.productosList.find((p) => p.id_producto === productId);
      return selectedProduct ? `${selectedProduct.nombre} - ${selectedProduct.descripcion}` : '';
      
    }
    

    listaUsuarios() {
    this.usuariosList = null;
    this.gService
    .list('user')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    this.usuariosList = data;
    });
    }
  
    listaProductos() {
    this.productosList = null;
    this.gService
    .list('producto')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    this.productosList = data;
    });
    }
   
    public errorHandling = (control: string, error: string) => {
    return this.mensajeriaForm.controls[control].hasError(error);
    };
  
    crearMensaje(): void {
    this.submitted = true;
    if(this.mensajeriaForm.invalid){
    return;
    }
    this.mensajeriaForm.patchValue({usuario:this.currentUser.user.id_usuario})
    this.gService.create('mensajeria',this.mensajeriaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    this.respMensajeria=data;
    this.noti.mensaje('Mensaje','Mensaje enviado',TipoMessage.success)
    this.router.navigate(['/mensajeria/all'],{
    queryParams: {create:'true'}
    });
    });
    
    }
  
    actualizarMensaje() {
      this.submitted = true;
      if (this.mensajeriaForm.invalid) {
        return;
      }
      console.log("tipoU "+  this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario)
      
      if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario===2&&!this.tieneRespuesta) {
    
        
        this.gService.update('mensajeria', this.mensajeriaForm.value)
          .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
           
            this.respMensajeria = data;
            this.noti.mensaje('Mensaje','Mensaje editado',TipoMessage.info)
            this.router.navigate(['/mensajeria/all'], {
              queryParams: { update: 'true' }
            });
          });
         
      } else {
        // Verificar si el usuario es de tipo cliente y si el mensaje no tiene respuesta
        if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario===3&&!this.tieneRespuesta) {
    
          
          this.gService.update('mensajeria', this.mensajeriaForm.value)
            .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
              this.respMensajeria = data;
              this.noti.mensaje('Mensaje','Mensaje editado',TipoMessage.info)
              this.router.navigate(['/mensajeria/all'], {
                queryParams: { update: 'true' }
              });
            });
        } else {
          // Mostrar un mensaje o tomar alguna acción si el usuario no tiene permiso
          this.noti.mensaje('Mensaje','El mensaje no puede ser editado porque ya tiene respuesta',TipoMessage.error)
          this.router.navigate(['/mensajeria/all'], {
            queryParams: { update: 'false' }
          });
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
    }

  
    
  
    onReset() {
     this.submitted = false;
     this.mensajeriaForm.reset();
    }
  
    onBack() {
    this.router.navigate(['/mensajeria/all']);
    }
    
    ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    }
  
  }
  