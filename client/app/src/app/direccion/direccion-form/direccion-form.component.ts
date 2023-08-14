import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.css']
})
export class DireccionFormComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();

  titleForm: string = 'Crear';

  usuarioList: any;

  direccionInfo: any;

  submitted = false;

  direccionForm: FormGroup;

  respDireccion: any;

  idDireccion: any;

  isCreate: boolean = true

  isAutenticated: boolean;
  currentUser: any;
  isOwner: boolean = false;

  directId: number;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer
  ) {
    this.formularioReactive();
    this.listaUsuario();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    this.activeRouter.queryParams.subscribe(queryParams => {
      const idDireccionParam = queryParams['id_direccion'];
      if (idDireccionParam && !isNaN(parseInt(idDireccionParam))) {
        this.directId = parseInt(idDireccionParam);
        console.log('Direct ID:', this.directId);
      }
      console.log(this.currentUser.user.nombre)
    });



    //Formulario de producto
    this.activeRouter.params.subscribe((params: Params) => {
      this.idDireccion = params['id'];
      console.log('id', this.idDireccion);
      if (this.idDireccion != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";
        this.gService
          .get('direccion', this.idDireccion)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log('data update', data);
            this.direccionInfo = data;
            this.direccionForm.setValue({
              id_direccion: this.direccionInfo.id_direccion,
              provincia: this.direccionInfo.provincia,
              canton: this.direccionInfo.canton,
              distrito: this.direccionInfo.distrito,
              direccion_exacta: this.direccionInfo.direccion_exacta,
              codigo_postal: this.direccionInfo.codigo_postal,
              telefono: this.direccionInfo.telefono,
              estado_actual: this.direccionInfo.estado_actual,
              usuario: this.direccionInfo.usuario.id_usuario
              // id_producto: this.productoInfo.id_producto,
              // nombre: this.productoInfo.nombre,
              // descripcion: this.productoInfo.descripcion,
              // precio: this.productoInfo.precio,
              // cantidad: this.productoInfo.cantidad,
              // estado_producto: this.productoInfo.estado_producto,
              // estado_actual: this.productoInfo.estado_actual,
              // usuario: this.productoInfo.usuario.id_usuario,
              // categoria: this.productoInfo.categoria.id_categoria,
            })
          });
      }
    });
    if (this.isCreate) {
      this.direccionForm.patchValue({ usuario: this.currentUser.user.nombre + " " + this.currentUser.user.apellidos })
    }
  }

  formularioReactive() {
    this.direccionForm = this.fb.group({
      id_direccion: [null, null],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required],
      direccion_exacta: [null, Validators.compose([
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(200)
      ])],
      codigo_postal: [null, Validators.compose([
        Validators.required,
        this.validateNumber
      ])],
      telefono: [null, Validators.compose([
        this.validateNumber,
        Validators.required
      ])],
      estado_actual: 'Activo',
      usuario: [null, Validators.required],
    });
  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') {
      return null;  // Permite campos vacíos, si lo deseas
    }

    const isValid = /^\d+$/.test(value);
    return isValid ? null : { numeric: true };
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

  public errorHandling = (control: string, error: string) => {
    return this.direccionForm.controls[control].hasError(error);
  };

  crearDireccion(): void {
    this.submitted = true;
    console.log(this.direccionForm.value);
    if (this.direccionForm.invalid) {
      return;
    }
    this.direccionForm.patchValue({ usuario: this.currentUser.user.id_usuario })
    console.log(this.direccionForm.value);
    this.gService.create('direccion', this.direccionForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respDireccion = data;
        this.noti.mensaje('Dirección', 'Dirección creado', TipoMessage.success)
        this.router.navigate(['/direccion/'], {
          queryParams: { create: 'true' }
        });
      })
  }

  actualizarDireccion() {
    this.submitted = true;
    if (this.direccionForm.invalid) {
      return;

    }

    this.gService.update('direccion', this.direccionForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {

        this.respDireccion = data;
        this.noti.mensaje('Dirección', 'Dirección editado', TipoMessage.info)
        this.router.navigate(['/direccion/'], {
          queryParams: { update: 'true' }
        });
      });
  }



}
