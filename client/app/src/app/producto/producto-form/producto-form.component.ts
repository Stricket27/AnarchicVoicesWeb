import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})


export class ProductoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  titleForm: string = 'Crear';

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
  archivosToUpdate: any = [];
  files: File[] = [];

  txtFoto: string;
  productId: number;
  txtFotografia: any;
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
    this.listaCategoria();
    this.listaUsuario();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    this.activeRouter.queryParams.subscribe(queryParams => {
      const idProductoParam = queryParams['id_producto'];
      if (idProductoParam && !isNaN(parseInt(idProductoParam))) {
        this.productId = parseInt(idProductoParam);
        console.log('Product ID:', this.productId);
      }
      console.log(this.currentUser.user.nombre)
    });



    //Formulario de producto
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      console.log('id', this.idProducto);
      if (this.idProducto != undefined && this.idFotografia != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log('data update', data);
            this.productoInfo = data;
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
            })
            this.archivos = data.fotografia;
            if (this.productoInfo.id_usuario === this.currentUser.user.id_usuario) {
              this.isOwner = true
            }
          });
      }
    });
    if (this.isCreate) {
      this.productoForm.patchValue({ usuario: this.currentUser.user.nombre + " " + this.currentUser.user.apellidos })
    }
    this.listaCategoria()
  }

  capturarArchivos(event): any {
    const archivoCapturado = event.target.files[0];
    this.archivos.push(archivoCapturado);
  };

  convertirBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
        reader.onerror = error => {
          resolve({
            base: null
          });
        };
      }
    }
    catch (e) {
      return null
    }
  });

  formularioReactive() {
    this.productoForm = this.fb.group({
      id_producto: [null, null],
      nombre: [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ])],
      descripcion: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])],
      precio: [null, Validators.compose([
        Validators.required,
        this.validateNumber
      ])],
      cantidad: [null, Validators.compose([
        Validators.required,
        this.validateNumber
      ])],
      estado_producto: [null, Validators.required],
      estado_actual: ['Activo'],
      usuario: [null, Validators.required],
      categoria: [null, Validators.required],
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

  async crearProducto() {
    this.submitted = true;
    console.log(this.productoForm.value);
    if (this.productoForm.invalid) {
      return;
    }
    this.productoForm.patchValue({ usuario: this.currentUser.user.id_usuario })
    console.log(this.productoForm.value)
    //producto
    this.gService.create('producto', this.productoForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe(async (data: any) => {
        this.respProducto = data;
        if (this.archivos.length == 0) {
          this.router.navigate(['producto/all'])
        }
        for (let i = 0; i < this.archivos.length; i++) {
          const file = this.archivos[i];
          file.Producto = data.id_producto;
          const redirect = (i + 1) == this.archivos.length ? true : false;
          await this.uploadsImages(file, redirect);
        }
      });
  }

  // if(archivos.length == 0){
  //   Agregue el router navifate
  //   }

  async uploadsImages(file, redirect) {
    const formData = new FormData();
    formData.append('file', file.fotografia);

    this.gService.create('fotografia/create', formData)
      .pipe(takeUntil(this.destroy$)).subscribe(async (res: any) => {
        file.fotografia = res.fileName;
        await this.uploadPhotoToServer(file, redirect)
      });
  }

  async uploadPhotoToServer(file, redirect) {
    this.gService.create('fotografia', file)
      .pipe(takeUntil(this.destroy$)).subscribe(async (res: any) => {
        console.log('photo added to server');
        if (redirect) {
          this.router.navigate(['/producto/all'], {
            queryParams: { update: 'true' }
          });
        }
      });
  }

  async actualizarProducto() {
    this.submitted = true;
    if (this.productoForm.invalid) {
      return;
    }

    console.log(this.productoForm.value);
    this.gService.update('producto', this.productoForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe(async (data: any) => {
        this.respProducto = data;
        if (this.archivos.length == 0) {
          this.router.navigate(['producto/all'])
        }
        for (let i = 0; i < this.archivosToUpdate.length; i++) {
          const file = this.archivosToUpdate[i];
          file.Producto = data.id_producto;
          const redirect = (i + 1) == this.archivosToUpdate.length ? true : false;
          await this.uploadsImages(file, redirect);
        }
        this.router.navigate(['/producto/all'], {
          queryParams: { update: 'true' }
        });
      });
  }

  agregarFotografia(event): void {
    this.archivos.push({
      fotografia: this.txtFoto,
      estado_actual: 'Activo'
    })

    this.productoForm.patchValue({
      fotografias: this.archivos
    })
  }

  eliminarFoto(id) {
    this.gService.update('fotografia/delete', { id })
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log('foto deleted');
        this.archivos = this.archivos.filter((foto) => foto.id_fotografia != id);
      });
  }

  async onSelect(event) {
    this.files.push(...event.addedFiles);
    const gettedFiles = event.addedFiles;
    for (let i = 0; i < gettedFiles.length; i++) {
      //  const imageBase64 = await this.readFileAsBase64(this.files[i]);
      if (this.isCreate) {
        this.archivos.push({
          fotografia: gettedFiles[i],
          estado_actual: 'Activo'
        })
      } else {
        this.archivosToUpdate.push({
          fotografia: gettedFiles[i],
          estado_actual: 'Activo'
        })
      }
    }
    // this.productoForm.patchValue({
    //   fotografias: this.archivos
    // })
  }


  async onRemove(event) {
    if (this.isCreate) {
      this.archivos = [];
    } else {
      this.archivosToUpdate = [];
    }
    this.files.splice(this.files.indexOf(event), 1);
    for (let i = 0; i < this.files.length; i++) {
      //const imageBase64 = await this.readFileAsBase64(this.files[i]);
      if (this.isCreate) {
        this.archivos.push({
          fotografia: this.files[i],
          estado_actual: 'Activo'
        })
      } else {
        this.archivosToUpdate.push({
          fotografia: this.files[i],
          estado_actual: 'Activo'
        })
      }
    }
    // this.productoForm.patchValue({
    //   fotografias: this.archivos
    // })
  }

  readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
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
