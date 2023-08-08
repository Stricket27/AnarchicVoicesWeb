import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { GenericService } from "src/app/share/generic.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-producto-form",
  templateUrl: "./producto-form.component.html",
  styleUrls: ["./producto-form.component.css"],
})
export class ProductoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  titleForm: string = "Crear producto y fotografia";

  usuarioList: any;
  categoriaList: any;

  productoInfo: any;
  fotografiaInfo: any;

  respProducto: any;
  respFotografia: any;

  submitted = false;

  productoForm: FormGroup;
  fotografiaForm: FormGroup;

  idProducto: number = 0;
  idFotografia: number = 0;

  isCreate: boolean = true;

  archivos: any = [];
  txtFotografia: any;

  // selectedImage: any;


  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,

    private sanitizer: DomSanitizer
  ) {
    this.formularioReactive();
    this.listaCategoria();
    this.listaUsuario();
  }

  ngOnInit(): void {
    //Formulario de producto
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params["id"];

      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";
        this.gService
          .get("producto", this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.productoInfo = data;
            console.log(this.productoInfo)
            this.productoForm.setValue({
              id_producto: this.productoInfo.id_producto,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              precio: this.productoInfo.precio,
              cantidad: this.productoInfo.cantidad,
              estado_producto: this.productoInfo.estado_producto,
              estado_actual: this.productoInfo.estado_actual,
              usuario: this.productoInfo.usuario.id_usuario,
              categoria: this.productoInfo.categoria.id_categoria,
              fotografias: this.productoInfo.fotografia,

            });
            this.archivos = this.productoInfo.fotografia;
          });
      }
    });
  }

  formularioReactive() {
    this.productoForm = this.fb.group({
      id_producto: [null, null],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      estado_producto: [null, Validators.required],
      estado_actual: [null, Validators.required],
      usuario: [null, Validators.required],
      categoria: [null, Validators.required],

      fotografias: [null, Validators.required],
    });
  }

  listaUsuario() {
    this.usuarioList = null;
    this.gService
      .list("user")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.usuarioList = data;
      });
  }

  listaCategoria() {
    this.categoriaList = null;
    this.gService
      .list("categoria")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.categoriaList = data;
      });
  }

  crearProducto(): void {
    try {
      this.submitted = true;
      if (this.productoForm.invalid) {
        return;
      }
      //producto
      this.gService
        .create("producto", this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respProducto = data;
          this.router.navigate(["/producto/all"], {
            queryParams: { create: "true" },
          });
          console.log(this.productoForm.value);
        });
    } catch (e) {
      console.log(e);
    }
  }

  linkFotografia(event) {
    this.txtFotografia = event.target.value
  }

  agregarFotografia(): void {
    // const inputElement: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;
    // const file: File = inputElement.files![0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.selectedImage = reader.result;
    // };
    // reader.readAsDataURL(file);
    this.archivos.push({
      fotografia: this.txtFotografia,
      estado_actual: 'Activo'
    })
    this.productoForm.patchValue({
      fotografias: this.archivos
    })
    console.log(this.archivos)
  }

  eliminarFotografiaDeProducto(index: any) {
    if (this.isCreate == false) {
      this.eliminarFotografia(index)
    }
    else {
      this.archivos.splice(index, 1)
    }
  }

  eliminarFotografia(index: any) {
    this.gService.update('fotografia/eliminarFoto', { id: this.archivos[index].id_fotografia })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respProducto = data;
        this.archivos.splice(index, 1)
        console.log('eliminado')
      });

  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
    };

  actualizarProducto() {
    console.log(this.productoForm.value);
    this.gService
      .update("producto", this.productoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respProducto = data;
        this.router.navigate(["/producto/all"], {
          queryParams: { update: "true" },
        });
      });
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }

  onBack() {
    this.router.navigate(["/producto/all"]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
