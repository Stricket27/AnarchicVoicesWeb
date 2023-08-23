import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { GenericService } from "src/app/share/generic.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NotificacionService } from "src/app/share/notification.service";
import { AuthenticationService } from "src/app/share/authentication.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  userInfo: any;
  respUser: any;
  submitted = false;
  userForm: FormGroup;
  idUsuario: number = 0;
  isCreate: boolean = true;


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
  }

  

  ngOnInit(): void{
    this.activeRouter.params.subscribe((params:Params) =>{
      this.idUsuario = params['id'];
      if(this.idUsuario != undefined){
        this.isCreate = false;

        this.gService
        .get('user/', this.idUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) =>{
          this.userInfo = data;
          console.log(this.userInfo);

          this.userForm.setValue({
            id_usuario: this.userInfo.id_usuario,
            nombre: this.userInfo.nombre,
            apellidos: this.userInfo.apellidos,
            numero_telefono: this.userInfo.numero_telefono,
            correo_electronico: this.userInfo.correo_electronico,
            contrasenna: this.userInfo.contrasenna,
            estado_actual: this.userInfo.estado_actual
          });
        });
      }
    });
  }

  formularioReactive(){
    this.userForm = this.fb.group({
      id_usuario: [null,null],
      nombre: [null, Validators.required],
      apellidos: [null, Validators.required],
      numero_telefono: [null, Validators.required],
      correo_electronico: [null, Validators.required],
      contrasenna: [null, Validators.required],
      estado_actual: [null, Validators.required]
    })
  }

  crearUsuario(): void{
    this.submitted = true;

    if(this.userForm.invalid){
      return;
    }

    this.gService.create('usuario', this.userForm.value)
    .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.respUser = data;
      this.router.navigate(['/user/all'], {
        queryParams: {create: 'true'}
      });
    });

  }

  actualizarUsuario(){
    console.log(this.userForm.value);
    this.gService
    .update("user", this.userForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any) => {
      this.respUser = data
      this.router.navigate(["/user/all"], {
        queryParams: { update: 'true' },
      });
    });
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
  onBack() {
    this.router.navigate(['/user/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}
