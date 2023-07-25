import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  usuarioList: any;
  categoriaList: any;
  productoInfo: any;
  respProducto: any;
  submitted = false;
  productoForm: FormGroup;
  idProducto: number = 0;
  isCreate: boolean = true;

  constructor(
  private fb: FormBuilder,
  private gService: GenericService,
  private router: Router,
  private activeRouter: ActivatedRoute,
  private currencyPipe: CurrencyPipe
  )
  {
  this.formularioReactive();
  this.listaCategoria();
  this.listaUsuario();
  }

  ngOnInit(): void {
  this.activeRouter.params.subscribe((params:Params)=>{
  this.idProducto=params['id_producto'];
  if(this.idProducto!=undefined){
  this.isCreate=false;
  this.titleForm="Actualizar";
  this.gService.get('producto',this.idProducto).pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{
  this.productoInfo=data;
  this.productoForm.setValue({
  id_producto:this.productoInfo.id_producto,
  nombre:this.productoInfo.nombre,
  descripcion:this.productoInfo.descripcion,
  precio:this.productoInfo.precio,
  cantidad: this.productoInfo.cantidad,
  estado_producto: this.productoInfo.estado_producto,
  estado_actual: this.productoInfo.estado_actual,
  usuario: this.productoInfo.usuario.map(({id_usuario}) => id_usuario),
  categoria:this.productoInfo.categoria.map(({id_categoria}) => id_categoria)
  })
  });
  }
  });
  }

  formularioReactive() {
  this.productoForm=this.fb.group({
  id_producto:[null,null],
  nombre:[null, Validators.required],
  descripcion: [null, Validators.required],
  precio: [null, Validators.required],
  cantidad: [null, Validators.required],
  estado_producto: [null, Validators.required],
  estado_actual: [null, Validators.required],
  usuario: [null, Validators.required],
  categoria: [null, Validators.required],
  })
  this.productoForm.valueChanges.subscribe ( form => {
  if(form.precio){
  this.productoForm.patchValue({
  precio: this.currencyPipe.transform(form.precio.replace(/\D/g, '').replace(/^0+/, ''), '₡', 'symbol', '1.0-0')
  },
  {emitEvent: false});
  }
  });
  }
  
  listaUsuario() {
  this.usuarioList = null;
  this.gService
  .list('user')
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
  console.log(data);
  this.usuarioList = data;
  });
  }

  listaCategoria() {
  this.categoriaList = null;
  this.gService
  .list('categoria')
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
  console.log(data);
  this.categoriaList = data;
  });
  }

  public errorHandling = (control: string, error: string) => {
  return this.productoForm.controls[control].hasError(error);
  };

  crearProducto(): void {
  this.submitted = true;
  if(this.productoForm.invalid){
  return;
  }
  let cFormat:any=this.productoForm.get('categoria').value.map(x=>({['id_categoria']: x}));
  this.productoForm.patchValue({categoria: cFormat});

  let uFormat:any=this.productoForm.get('usuario').value.map(x=>({['id_usuario']: x}))
  this.productoForm.patchValue({usuario: uFormat});
  
  console.log(this.productoForm.value);
  this.gService.create('producto',this.productoForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
  this.respProducto=data;
  this.router.navigate(['/producto/all'],{
  queryParams: {create:'true'}
  });
  });
  }

  actualizarProducto() {
  this.submitted=true;
  if(this.productoForm.invalid){
  return;
  }
  let cFormat:any=this.productoForm.get('categoria').value.map(x=>({['id_categoria']: x}));
  this.productoForm.patchValue({categoria: cFormat});

  let uFormat:any=this.productoForm.get('usuario').value.map(x=>({['id_usuario']: x}));
  this.productoForm.patchValue({usuario: uFormat});
  
  console.log(this.productoForm.value);
  this.gService.update('producto',this.productoForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
  this.respProducto=data;
  this.router.navigate(['/producto/all'],{
  queryParams: {update:'true'}
  });
  });
  }

  onReset() {
  this.submitted = false;
  this.productoForm.reset();
  }

  onBack() {
  this.router.navigate(['/producto/all']);
  }
  
  ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }

}
