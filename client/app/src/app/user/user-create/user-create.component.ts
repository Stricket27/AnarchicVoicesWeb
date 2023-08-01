import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      numero_telefono: ['', [Validators.required]],
      correo_electronico: ['', [Validators.required]],
      contrasenna: ['', [Validators.required]],
      estado_actual: ['Activo'],
      tipoUsuario: ['', [Validators.required]]
    });
    this.getTipoUsuario();
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formCreate.invalid){
     return;
    }
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;
      this.router.navigate(['/user/login'],{
        //Mostrar un mensaje
        queryParams:{register:'true'},
      })
    })
  }
  onReset() {
    this.formCreate.reset();
  }

  getTipoUsuario(){
    this.gService
    .list('tipoUsuario')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.tipoUsuario = data;
      console.log (this.tipoUsuario);
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
