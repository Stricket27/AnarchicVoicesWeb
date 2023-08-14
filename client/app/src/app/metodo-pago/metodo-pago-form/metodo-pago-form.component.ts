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
  selector: 'app-metodo-pago-form',
  templateUrl: './metodo-pago-form.component.html',
  styleUrls: ['./metodo-pago-form.component.css']
})
export class MetodoPagoFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioList: any;
  tipoPagoList: any;

  metodoPagoInfo: any;
  respMetodoPago: any;
  submitted = false;
  metodoPagoForm: any;
  idMetodoPago: number = 0;
  isCreate: boolean = true;
  metPaId: number;
  isAutenticated: boolean;
  currentUser: any;
  isOwner: boolean = false;

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
    this.listaTipoPago();
    this.listaUsuario();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    this.activeRouter.queryParams.subscribe(queryParams => {
      const idMetodoPagoParam = queryParams['id_metodoPago'];
      if (idMetodoPagoParam && !isNaN(parseInt(idMetodoPagoParam))) {
        this.metPaId = parseInt(idMetodoPagoParam);
      }
      console.log(this.currentUser.user.nombre)
    });
    //Formulario de producto
    this.activeRouter.params.subscribe((params: Params) => {
      this.idMetodoPago = params['id'];
      if (this.idMetodoPago != undefined) {
        this.isCreate = false;
        this.gService
          .get('metodoPago', this.idMetodoPago)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log('data update', data);
            this.metodoPagoInfo = data;
            this.metodoPagoForm.setValue({
              id_metodoPago: this.metodoPagoInfo.id_metodoPago,
              numeroCuenta: this.metodoPagoInfo.numeroCuenta,
              mesVencimiento: this.metodoPagoInfo.mesVencimiento,
              annoVencimiento: this.metodoPagoInfo.annoVencimiento,
              codigoSeguridad: this.metodoPagoInfo.codigoSeguridad,
              estado_actual: this.metodoPagoInfo.estado_actual,
              usuario: this.metodoPagoInfo.usuario.id_usuario,
              tipoPago: this.metodoPagoInfo.tipoPago.id_tipoPago,
            })
          });
      }
    });
    if (this.isCreate) {
      this.metodoPagoForm.patchValue({ usuario: this.currentUser.user.nombre + " " + this.currentUser.user.apellidos })
    }
    this.listaTipoPago()
  }

  formularioReactive() {
    this.metodoPagoForm = this.fb.group({
      id_metodoPago: [null, null],
      numeroCuenta: [null, Validators.compose([
        Validators.required, this.validateNumber,
      ])],
      mesVencimiento: [null, Validators.compose([
        Validators.required, this.validateNumber,
        Validators.pattern("^[0-9]*$")
      ])],
      annoVencimiento: [null, Validators.compose([
        Validators.required, this.validateNumber,
        Validators.pattern("^[0-9]*$")
      ])],
      codigoSeguridad: [null, Validators.compose([
        Validators.required, this.validateNumber
      ])],
      estado_actual: ['Activo'],
      usuario: [null, Validators.required],
      tipoPago: [null, Validators.required],
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

  listaTipoPago() {
    this.tipoPagoList = null;
    this.gService
      .list('tipoPago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.tipoPagoList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.metodoPagoForm.controls[control].hasError(error);
  };

  crearMetodoPago(): void {
    const metodoPago = this.metodoPagoForm.value;
    this.submitted = true;
    if (this.metodoPagoForm.invalid) {
      return;
    }
    metodoPago.mesVencimiento = parseInt(metodoPago.mesVencimiento);
    metodoPago.annoVencimiento = parseInt(metodoPago.annoVencimiento);
    this.metodoPagoForm.patchValue({ usuario: this.currentUser.user.id_usuario })
    this.gService.create('metodoPago', this.metodoPagoForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respMetodoPago = data;
        this.noti.mensaje('Metodo de pago', 'Metodo de pago agregado', TipoMessage.success)
        this.router.navigate(['/metodoPago/'], {
          queryParams: { create: 'true' }
        });
      });
  }

  actualizarMetodoPago(): void {
    this.submitted = true;
    if (this.metodoPagoForm.invalid) {
      return;
    }
    this.metodoPagoForm.patchValue({ usuario: this.currentUser.user.id_usuario })
    this.gService.update('metodoPago', this.metodoPagoForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respMetodoPago = data;
        this.noti.mensaje('Metodo de pago', 'Metodo de pago actualizado', TipoMessage.success)
        this.router.navigate(['/metodoPago/'], {
          queryParams: { create: 'true' }
        });
      });
  }

















}
