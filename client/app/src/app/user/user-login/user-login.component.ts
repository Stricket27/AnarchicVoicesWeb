import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/share/authentication.service";
import {
  NotificacionService,
  TipoMessage,
} from "src/app/share/notification.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      correo_electronico: ["", [Validators.required, Validators.email]],
      contrasenna: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    //Mensaje usuario registrado
    let register = false;
    let auth = "";
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params["register"] === "true" || false;
      auth = params["auth"] || "";
      if (register) {
        this.notificacion.mensaje(
          "Usuario",
          "Uusario registrado! Especifique sus credenciales",
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          "Usuario",
          "Acceso denegado",
          TipoMessage.warning
        );
        console.log(register);
      }
    });
  }
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(["/"]);
      });
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
