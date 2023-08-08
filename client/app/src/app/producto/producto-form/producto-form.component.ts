<form
  [formGroup]="productoForm"
  (ngSubmit)="isCreate ? crearProducto() : actualizarProducto()"
  novalidate
>
  <input type="hidden" formControlName="id_producto" />
  <mat-card
    class="shipping-card"
    style="background-color: #f4f4f9; box-shadow: none"
  >
    <mat-card-header>
      <h1>
        <b>{{ titleForm }}</b>
      </h1>
    </mat-card-header>
    <mat-card-content>
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Nombre del producto</mat-label>
            <input matInput formControlName="nombre" />
            <mat-error *ngIf="errorHandling('nombre', 'required')">
              Nombre es <strong>requerido</strong>
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <mat-form-field class="full-width">
            <span matPrefix>Album: &nbsp;</span>
            <mat-label>Descripción del producto</mat-label>
            <input matInput formControlName="descripcion" />
            <mat-error *ngIf="errorHandling('descripcion', 'required')">
              Descripción es <strong>requerido</strong>
            </mat-error>
          </mat-form-field>
        </div>

        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Precio del producto</mat-label>
            <input matInput formControlName="precio" />
            <mat-error *ngIf="errorHandling('precio', 'required')">
              Precio es <strong>requerido</strong>
            </mat-error>
          </mat-form-field>
        </div>

        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Cantidad del producto</mat-label>
            <input matInput formControlName="cantidad" />
            <mat-error *ngIf="errorHandling('cantidad', 'required')">
              Cantidad es <strong>requerido</strong>
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="row">
        <div class="col" *ngIf="categoriaList">
          <mat-form-field class="full-width">
            <mat-label>Categoria del producto</mat-label>
            <mat-select formControlName="categoria">
              <mat-option
                *ngFor="let c of categoriaList"
                [value]="c.id_categoria"
              >
                {{ c.descripcion }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="col" *ngIf="usuarioList">
          <mat-form-field class="full-width">
            <mat-label>Usuario del producto</mat-label>
            <mat-select formControlName="usuario">
              <mat-option *ngFor="let u of usuarioList" [value]="u.id_usuario">
                {{ u.nombre }} {{ u.apellidos }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Estado del producto</mat-label>
            <mat-select formControlName="estado_producto">
              <mat-option value="Nuevo">Nuevo</mat-option>
              <mat-option value="Semi-nuevo">Semi-nuevo</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Estado actual del producto</mat-label>
            <mat-select formControlName="estado_actual">
              <mat-option value="Activo">Activo</mat-option>
              <mat-option value="Inactivo">Inactivo</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </mat-card-content>

    <!-- <input id="fileInput" type="file" (change)="linkFotografia($event)">
    <img *ngIf="selectedImage" [src]="selectedImage" alt="Imagen seleccionada"> -->

    <!-- <input type="text" (input)="linkFotografia($event)" /> -->

    <mat-card-actions>
      <button mat-raised-button color="primary" type="submit">
        Guardar producto
      </button>
    </mat-card-actions>

    <mat-card class="example-card" style="margin-left: 32%">
      <mat-card-header>
        <h1>Apartado de imagenes</h1>
      </mat-card-header>
      <mat-card-header>
        <p>
          <b>Nota:</b> Antes de agregar la fotogarafía debes de entrar a este
          link <a href="https://es.imgbb.com/" target="_blank">IMG BB</a> este
          link es para convertir la imagen en una URL y asi que puedas agregar
          la imagen deseada, si no sabes exactamente como se hace, aqui te mostramos un
          <a href="./assets/pdf/Manual de URL de imágenes.pdf" target="_blank">PDF</a> donde muestra los pasos a seguir. 
        </p>
      </mat-card-header>
      <mat-card-header>
        <p>
          <b style="color: red">Advertencia:</b> Cuando vas agregar la imagen
          con la URL que le generó, si de alguna manera no te gusta, la puedes
          eliminar, antes de crear el producto deseado
        </p>
      </mat-card-header>

      <mat-card-content style="background-color: #ced4da">
        <mat-form-field class="full-width" style="background-color: #ced4da">
          <mat-label>Link de la fotografia</mat-label>
          <input matInput type="text" (input)="linkFotografia($event)" />
        </mat-form-field>
        <button
          mat-raised-button
          mat-button
          color="primary"
          type="button"
          (click)="agregarFotografia()"
        >
          Agregar fotografia deseada
        </button>
        <mat-card-actions> </mat-card-actions>
      </mat-card-content>

      <div class="row">
        <div
          class="col-sm-6 col-md-4"
          *ngFor="let item of archivos; let i = index"
        >
          <img src="{{ item.fotografia }}" />
          <button
            mat-raised-button
            mat-button
            color="warn"
            type="button"
            (click)="eliminarFotografiaDeProducto(i)"
          >
            Eliminar fotografia
          </button>
        </div>
      </div>
    </mat-card>
  </mat-card>
</form>
