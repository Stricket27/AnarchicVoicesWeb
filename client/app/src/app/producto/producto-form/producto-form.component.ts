<mat-card class="full-width">
  <h1 class="mat-h1"><b>Mantenimiento de producto por vendedor</b></h1>
  <mat-card-content>
    <mat-card-title>
      <a
        mat-fab
        extended
        matTooltip="Crear Producto"
        aria-label="Crear Producto"
        color="primary"
        (click)="crearProducto()"
        ><mat-icon>add</mat-icon>
        Crear un nuevo producto
      </a>
    </mat-card-title>
    <br />
    <div class="mat-elevation-z8" *ngIf="dataSource">
      <table
        mat-table
        [dataSource]="dataSource"
        class="full-width-table"
        matSort
        aria-label="Elements"
      >
        <ng-container matColumnDef="producto">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Producto</th>
          <td mat-cell *matCellDef="let row">
            {{ row.nombre }} - {{ row.descripcion }}
          </td>
        </ng-container>

        <ng-container matColumnDef="precio">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Precio</th>
          <td mat-cell *matCellDef="let row">
            {{ row.precio | currency : "₡" }}
          </td>
        </ng-container>

        <ng-container matColumnDef="cantidad">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Cantidad</th>
          <td mat-cell *matCellDef="let row">{{ row.cantidad }}</td>
        </ng-container>

        <ng-container matColumnDef="id_usuario">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Vendedor</th>
          <td mat-cell *matCellDef="let row">
            {{ getNombreUsuario(row.id_usuario) }}
          </td>
        </ng-container>

        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>

          <td mat-cell *matCellDef="let row">
            <button
              mat-mini-fab
              color="accent"
              matTooltip="Actualizar producto"
              aria-label="Actualizar producto"
              color="primary"
              (click)="actualizarProducto(row.id_producto)"
            >
              <mat-icon class="mat-18">edit</mat-icon>
            </button>

            <button
              mat-mini-fab
              color="accent"
              matTooltip="Detalle Producto"
              aria-label="Detalle Producto"
              color="primary"
              (click)="detalle(row.id_producto)"
            >
              <mat-icon class="mat-18">info</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>

        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        #paginator
        [length]="dataSource?.data?.length"
        [pageIndex]="0"
        [pageSize]="10"
        [pageSizeOptions]="[10, 20, 50]"
        aria-label="Selecccione una página"
      ></mat-paginator>
    </div>
  </mat-card-content>
</mat-card>
