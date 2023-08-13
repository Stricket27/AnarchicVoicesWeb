import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  hide = true;
  usuario: any;
  tipoUsuario: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', Validators.compose
        ([Validators.required, 
          Validators.minLength(4)])
      ],
      apellidos: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(100)
      ]
      )],
      numero_telefono: ['', Validators.compose([
        Validators.required, 
        this.validateNumber, 
        Validators.maxLength(8)
      ])],
      correo_electronico: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100),
        Validators.email
      ])],
      contrasenna: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100),
      ])],
      estado_actual: ['Activo'],
      tipoUsuario: ['', [Validators.required]]
    });
    this.getTipoUsuario();
  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') {
      return null;  // Permite campos vacíos, si lo deseas
    }

    const isValid = /^\d+$/.test(value);
    return isValid ? null : { numeric: true };
  }

  ngOnInit(): void { }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formCreate.invalid) {
      return;
    }
    this.authService.createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;
        this.router.navigate(['/user/login'], {
          //Mostrar un mensaje
          queryParams: { register: 'true' },
        })
      })
  }
  onReset() {
    this.formCreate.reset();
  }

  getTipoUsuario() {
    this.gService
      .list('tipoUsuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipoUsuario = data.filter((tipo => tipo.descripcion !== 'Administrador'));
        console.log(this.tipoUsuario);
      })
  }


  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
