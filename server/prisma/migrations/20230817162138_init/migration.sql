-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `numero_telefono` VARCHAR(191) NOT NULL,
    `correo_electronico` VARCHAR(191) NOT NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_correo_electronico_key`(`correo_electronico`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalle_UsuarioTipo` (
    `id_usuario` INTEGER NOT NULL,
    `id_tipoUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_usuario`, `id_tipoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoUsuario` (
    `id_tipoUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tipoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalificacionUsuario` (
    `id_calificacionUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `vendedor_cliente` VARCHAR(191) NOT NULL,
    `calificacion` INTEGER NOT NULL,
    `calificacion_promedio` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_calificacionUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id_direccion` INTEGER NOT NULL AUTO_INCREMENT,
    `provincia` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `distrito` VARCHAR(191) NOT NULL,
    `direccion_exacta` VARCHAR(191) NULL,
    `codigo_postal` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_direccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodoPago` (
    `id_metodoPago` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroCuenta` VARCHAR(191) NOT NULL,
    `mesVencimiento` INTEGER NOT NULL,
    `annoVencimiento` INTEGER NOT NULL,
    `codigoSeguridad` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_tipoPago` INTEGER NOT NULL,

    PRIMARY KEY (`id_metodoPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoPago` (
    `id_tipoPago` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tipoPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `id_ordenCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto_total` DECIMAL(10, 2) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_metodoPago` INTEGER NOT NULL,

    PRIMARY KEY (`id_ordenCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LineaDetalle` (
    `id_lineaDetalle` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `sub_total` DECIMAL(10, 2) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `id_ordenCompra` INTEGER NOT NULL,

    PRIMARY KEY (`id_lineaDetalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `estado_producto` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fotografia` (
    `id_fotografia` INTEGER NOT NULL AUTO_INCREMENT,
    `fotografia` VARCHAR(10000) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_producto` INTEGER NOT NULL,

    PRIMARY KEY (`id_fotografia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado_actual` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensajeria` (
    `id_mensajeria` INTEGER NOT NULL AUTO_INCREMENT,
    `asunto` VARCHAR(191) NOT NULL,
    `mensaje` VARCHAR(191) NOT NULL,
    `respuesta` VARCHAR(191) NULL,
    `estado_actual` VARCHAR(191) NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_mensajeria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Detalle_UsuarioTipo` ADD CONSTRAINT `Detalle_UsuarioTipo_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_UsuarioTipo` ADD CONSTRAINT `Detalle_UsuarioTipo_id_tipoUsuario_fkey` FOREIGN KEY (`id_tipoUsuario`) REFERENCES `TipoUsuario`(`id_tipoUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalificacionUsuario` ADD CONSTRAINT `CalificacionUsuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_id_tipoPago_fkey` FOREIGN KEY (`id_tipoPago`) REFERENCES `TipoPago`(`id_tipoPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_id_metodoPago_fkey` FOREIGN KEY (`id_metodoPago`) REFERENCES `MetodoPago`(`id_metodoPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineaDetalle` ADD CONSTRAINT `LineaDetalle_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineaDetalle` ADD CONSTRAINT `LineaDetalle_id_ordenCompra_fkey` FOREIGN KEY (`id_ordenCompra`) REFERENCES `OrdenCompra`(`id_ordenCompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fotografia` ADD CONSTRAINT `Fotografia_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensajeria` ADD CONSTRAINT `Mensajeria_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensajeria` ADD CONSTRAINT `Mensajeria_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
