
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

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
    
    )
    {
    this.formularioReactive();
    this.listaProductos();
    this.listaUsuarios();
    }
  
    ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
    this.idMensajeria=params['id_mensajeria'];
    if(this.idMensajeria!=undefined){
    this.isCreate=false;
    this.titleForm="Actualizar";
    this.gService.get('mensajeria',this.idMensajeria).pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
     this.mensajeriaInfo=data;
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
     });
    }
  
    formularioReactive() {
    this.mensajeriaForm=this.fb.group({
    id_mensajeria:[null,null],
    respuesta:[null,null],
    estado_actual: ["Pendiente"],
    asunto:[null, Validators.required],
    mensaje: [null, Validators.required],
    producto: [null, Validators.required],
    usuario: [null, Validators.required],
   
    })
   
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
    this.router.navigate(['/mensajeria/all'],{
    queryParams: {create:'true'}
    });
    });
    }
  
    actualizarMensaje() {
    this.submitted=true;
    if(this.mensajeriaForm.invalid){
    return;
    }
    
    console.log(this.mensajeriaForm.value);
    this.gService.update('mensajeria',this.mensajeriaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    this.respMensajeria=data;
    this.router.navigate(['/mensajeria/all'],{
    queryParams: {update:'true'}
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
  