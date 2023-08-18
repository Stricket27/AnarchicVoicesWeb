import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { LocationService } from 'src/app/share/location.service';

@Component({
  selector: 'app-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.css']
})
export class DireccionFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioList: any;
  direccionInfo: any;
  submitted = false;
  direccionForm: FormGroup;
  respDireccion: any;
  idDireccion: any;
  idUsuario: number;
  isCreate: boolean = true
  isAutenticated: boolean;
  currentUser: any;
  isOwner: boolean = false;
  directId: number;
  Provincias: any[];
  Cantones: any[];
  Distritos: any[];
  selectedProvincia: string;
  selectedCanton: string;
  selectedDistrito: string;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private locationService: LocationService
  ) {
    this.formularioReactive();
    this.listaUsuario();
    this.getProvincia();
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
    this.direccionForm.patchValue({ id_usuario: this.idUsuario })
    console.log(this.direccionForm.value);
    if (this.direccionForm.invalid) {
      return;
    }

    const direccionDATA = {
      provincia: this.selectedProvincia,
      canton: this.selectedCanton,
      distrito: this.selectedDistrito,
      direccion_exacta: this.direccionForm.value.direccion_exacta,
      codigo_postal: this.direccionForm.value.codigo_postal,
      telefono: this.direccionForm.value.telefono,
      estado_actual: this.direccionForm.value.estado_actual,
      usuario: this.currentUser.user.id_usuario
    }
    // this.direccionForm.value.id_usuario = this.idUsuaio;
    this.direccionForm.patchValue({ usuario: this.currentUser.user.id_usuario })
    console.log(this.direccionForm.value);
    this.gService.create('direccion', direccionDATA) /* this.direccionForm.value*/
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log('Nombre', this.currentUser.user.nombre)
        this.respDireccion = data;
        console.log('Dirección creada:', this.respDireccion);
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


  async getProvincia() {
    this.Provincias = await this.locationService.getProvincia();
    const provincesArray = Object.entries(this.Provincias).map(
      ([id, nombre]) => ({
        id,
        nombre
      })
    );
    this.Provincias = provincesArray
  }

  async getCantones(idProvince) {
    this.selectedProvincia = this.Provincias.find(p => p.id === idProvince)?.nombre;
    const cantons = await this.locationService.getCantones(idProvince);
    const cantonsArray = Object.entries(cantons).map(([id, nombre]) => ({
      id,
      nombre,
      provinceId: idProvince
    }));
    this.Cantones = cantonsArray
  }

  async getDistritos(idCanton, idPronvince) {
    console.log('getDistritos called with', idCanton, idPronvince);
    this.selectedCanton = this.Cantones.find(c => c.id === idCanton)?.nombre;
    this.selectedProvincia = this.Provincias.find(p => p.id === idPronvince)?.nombre;

    const districts = await this.locationService.getDistritos(idPronvince, idCanton);
    const districtsArray = Object.entries(districts).map(([id, nombre]) => ({
      id,
      nombre
    }));
    this.Distritos = districtsArray;

    const currentSelectedDistrict = this.direccionForm.get('distrito').value;
    if (!currentSelectedDistrict || !this.Distritos.some(d => d.nombre === currentSelectedDistrict)) {
      if (this.Distritos.length > 0) {
        const firsDistrictName = this.Distritos[0].nombre;
        this.selectedDistrito = firsDistrictName;
      }
    }
    else {
      this.selectedDistrito = currentSelectedDistrict;
    }
  }


}
