
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
  //Titulo
  titleForm: string = 'Crear';
   //Lista de generos
   productosList: any;
   usuariosList:any;
   productId: number;
  //Videojuego a actualizar
  mensajeriaInfo: any;
  
  //Respuesta del API crear/modificar
  respMensajeria: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  mensajeriaForm: FormGroup;
  //id del Videojuego
  idMensajeria: number = 0;
  //Sí es crear
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
   
   
    this.activeRouter.queryParams.subscribe((params:Params)=>{
      const idProductoParam = params['id_producto'];
      console.log('Product ID:', this.productId);
      
    this.idMensajeria=params['id_mensajeria'];
    if(this.idMensajeria!=undefined){
    this.isCreate=false;
    this.titleForm="Actualizar";
    this.gService.get('mensajeria',this.idMensajeria).pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
     
     this.mensajeriaInfo=data;
     console.log(this.mensajeriaInfo)
    this.mensajeriaForm.setValue({
    id_mensajeria:this.mensajeriaInfo.id_mensajeria,
     asunto:this.mensajeriaInfo.asunto,
     mensaje:this.mensajeriaInfo.mensaje,
     respuesta:this.mensajeriaInfo.respuesta,
     estado_actual:this.mensajeriaInfo.estado_actual,
    producto:this.mensajeriaInfo.producto,
    usuario:this.mensajeriaInfo.usuario,
     })
     });
    }
    if (idProductoParam && !isNaN(parseInt(idProductoParam))) {
      this.productId = parseInt(idProductoParam);
      console.log('Product ID:', this.productId);
     
       // Configurar el formulario para el caso de edición
       this.configurarFormularioEdicion(this.productId);
    }
     });
     this.listaProductos();
    }
  
    formularioReactive() {
    this.mensajeriaForm=this.fb.group({
    id_mensajeria:[null,null],
    respuesta:[null,Validators.compose([Validators.minLength(10),Validators.maxLength(100)])],
    
    estado_actual: ["Pendiente"],
    asunto:[null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(100)])],
    mensaje: [null, Validators.compose([Validators.required,Validators.minLength(20),Validators.maxLength(100)])],
    producto: [null, Validators.required],
    usuario: [null, Validators.required],
    })
   // Verificar si el campo respuesta es nulo y establecer "Pendiente" por defecto
  if (this.mensajeriaForm.get('respuesta').value != null ) {
    this.mensajeriaForm.patchValue({
      estado_actual: 'Pregunta respondida',
    });
  }
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
    configurarFormularioEdicion(idProducto: number) {
      // Configurar el formulario para el caso de edición cuando tenemos solo el id_producto del mensaje
    
      // Obtener el objeto completo del producto
      this.gService.get('producto', idProducto).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        // Cargar la lista de productos (ya que estamos en el caso de edición)
        this.listaProductos();
    
        // Configurar el valor del combo con el id_producto del mensaje
        this.mensajeriaForm.patchValue({
          producto: idProducto,
        });
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
      this.isCreate=false;
      if (this.mensajeriaForm.invalid) {
        return;
      }
  
      // Obtener el valor del campo producto del formulario
      const productId = this.mensajeriaForm.get('producto')?.value;
  
      // Configurar el objeto a enviar para actualizar el mensaje
      const mensajeActualizado = {
        id_mensajeria: this.mensajeriaForm.get('id_mensajeria')?.value,
        respuesta: this.mensajeriaForm.get('respuesta')?.value,
        estado_actual: this.mensajeriaForm.get('estado_actual')?.value,
        asunto: this.mensajeriaForm.get('asunto')?.value,
        mensaje: this.mensajeriaForm.get('mensaje')?.value,
        producto: productId,
        usuario: this.mensajeriaForm.get('usuario')?.value,
      };
  
      console.log(mensajeActualizado);
      this.gService.update('mensajeria', mensajeActualizado)
        .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.respMensajeria = data;
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
  