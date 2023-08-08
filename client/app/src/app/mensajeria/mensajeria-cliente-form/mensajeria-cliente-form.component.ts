
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti:NotificacionService
    )
    {
    this.formularioReactive();
    this.listaProductos();
    this.listaUsuarios();
    
    }
  
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(queryParams => {
      const idProductoParam = queryParams['id_producto'];
      if (idProductoParam && !isNaN(parseInt(idProductoParam))) {
        this.productId = parseInt(idProductoParam);
        console.log('Product ID:', this.productId);
       
       
      }
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
          console.log(this.mensajeriaInfo)
          this.mensajeriaForm.setValue({
            id:this.mensajeriaInfo.id_mensajeria,
            asunto:this.mensajeriaInfo.asunto,
            mensaje:this.mensajeriaInfo.mensaje,
            respuesta:this.mensajeriaInfo.respuesta,
            estado_actual:this.mensajeriaInfo.estado_actual,
            producto:this.productId,
            usuario:this.mensajeriaInfo.usuario,
          })
        });
      }
      
     
    });
   
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
      console.log(selectedProduct);
      return selectedProduct ? `${selectedProduct.nombre} - ${selectedProduct.descripcion}` : '';
      
    }
    

    listaUsuarios() {
    this.usuariosList = null;
    this.gService
    .list('user')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    console.log(data);
    this.usuariosList = data;
    });
    }
  
    listaProductos() {
    this.productosList = null;
    this.gService
    .list('producto')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    console.log(data);
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
    
    console.log(this.mensajeriaForm.value);
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
  
     
     
      this.gService.update('mensajeria', this.mensajeriaForm.value)
        .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.respMensajeria = data;
          this.noti.mensaje('Mensaje','Mensaje editado',TipoMessage.info)
          this.router.navigate(['/mensajeria/all'], {
            queryParams: { update: 'true' }
          });
        });
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
  