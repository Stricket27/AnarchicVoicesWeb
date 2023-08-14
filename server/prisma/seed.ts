
import { PrismaClient } from "@prisma/client";
import { categoria } from "./seeds/categoria";
import { tipoPago } from "./seeds/tipoPago";
import { tipoUsuario } from "./seeds/tipoUsuario";
import { usuario } from "./seeds/usuario";

const prisma = new PrismaClient();

async function main() {
    //categoria
    await prisma.categoria.createMany({
        data: categoria
    });
    //tipoPago
    await prisma.tipoPago.createMany({
        data: tipoPago
    });
    //tipoUsuario
    await prisma.tipoUsuario.createMany({
        data: tipoUsuario
    });
    //usuario
    await prisma.usuario.createMany({
        data: usuario
    })
    //detalle_usuarioTipo
    //Moises
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 1,
            id_tipoUsuario: 1
        }
    });
    //Daniel
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 2,
            id_tipoUsuario: 2
        }
    });
    //Yoryina
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 3,
            id_tipoUsuario: 3
        }
    });
    //Javier
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 4,
            id_tipoUsuario: 2
        }
    });
    //Horacio vendedor
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 5,
            id_tipoUsuario: 2
        }
    });
    //Horacio cliente
    await prisma.detalle_UsuarioTipo.create({
        data: {
            id_usuario: 5,
            id_tipoUsuario: 3
        }
    });
    //direccion
    await prisma.direccion.create({
        data: {
            provincia: 'Heredia',
            canton: 'Belen',
            distrito: 'Calle flores',
            direccion_exacta: '100 Oeste de los condominios Balcones de la Ribera',
            codigo_postal: '407072',
            telefono: '85525418',
            estado_actual: 'Activo',
            id_usuario: 1
        }
    });
    //calificacionUsuario
    await prisma.calificacionUsuario.create({
        data: {
            vendedor_cliente: 'Moises',
            calificacion: 5,
            calificacion_promedio: 0,
            id_usuario: 2
        }
    });
    //metodoPago
    //id:1
    await prisma.metodoPago.create({
        data: {
            numeroCuenta: '1234567891024587',
            mesVencimiento: 8,
            annoVencimiento: 2025,
            estado_actual: 'Activo',
            id_usuario: 1,
            id_tipoPago: 1
        }
    });
    //id:2
    await prisma.metodoPago.create({
        data: {
            numeroCuenta: '5123456789012346',
            mesVencimiento: 8,
            annoVencimiento: 2025,
            estado_actual: 'Activo',
            id_usuario: 2,
            id_tipoPago: 2
        }
    });
    //id:3
    await prisma.metodoPago.create({
        data: {
            numeroCuenta: '5123619745395853',
            mesVencimiento: 8,
            annoVencimiento: 2025,
            estado_actual: 'Activo',
            id_usuario: 3,
            id_tipoPago: 2
        }
    });

    //ordencompra
    //id:1
    await prisma.ordenCompra.create({
        data: {
            monto_total: '22600.00',
            estado_actual: 'Pendiente',
            id_usuario: 3,
            id_metodoPago: 2,
            direccion: "San Isidro de San Ramón"
        }
    });

    //id:2
    await prisma.ordenCompra.create({
        data: {
            monto_total: '42600',
            estado_actual: 'Pendiente',
            id_usuario: 2,
            id_metodoPago: 2,
            direccion: "San Antonio de Belén"
        }
    });
    //id:3
    await prisma.ordenCompra.create({
        data: {
            monto_total: '22600.00',
            estado_actual: 'Pendiente',
            id_usuario: 3,
            id_metodoPago: 2,
            direccion: "San Isidro de San Ramón"
        }
    });

    //id:4
    await prisma.ordenCompra.create({
        data: {
            monto_total: '15820.00',
            estado_actual: 'Pendiente',
            id_usuario: 2,
            id_metodoPago: 2,
            direccion: "San Antonio de Belen"
        }
    });


    //id:5
    await prisma.ordenCompra.create({
        data: {
            monto_total: '67800.00',
            estado_actual: 'Pendiente',
            id_usuario: 2,
            id_metodoPago: 2,
            direccion: "San Antonio de Belen"
        }
    });
    //id:6
    await prisma.ordenCompra.create({
        data: {
            monto_total: '16950.00',
            estado_actual: 'Pendiente',
            id_usuario: 2,
            id_metodoPago: 2,
            direccion: "San Antonio de Belen"
        }
    });
    //id:7
    await prisma.ordenCompra.create({
        data: {
            monto_total: '113000.00',
            estado_actual: 'Pendiente',
            id_usuario: 3,
            id_metodoPago: 2,
            direccion: "San Isidro de San Ramón"
        }
    });
    //id:8
    await prisma.ordenCompra.create({
        data: {
            monto_total: '22600.00',
            estado_actual: 'Pendiente',
            id_usuario: 3,
            id_metodoPago: 2,
            direccion: "San Isidro de San Ramón"
        }
    });

    // producto
    //id:1
    await prisma.producto.create({
        data: {
            nombre: 'All That Remains',
            descripcion: 'Album: The Fall Of Ideals',
            precio: '10000.00',
            cantidad: "10",
            estado_producto: 'Nuevo',
            estado_actual: 'Activo',
            id_usuario: 2,
            id_categoria: 1
        }
    });
    //id:2
    await prisma.producto.create({
        data: {
            nombre: 'Motionless in White',
            descripcion: 'Album: Creatures',
            precio: '20000.00',
            cantidad: "5",
            estado_producto: 'Semi-nuevo',
            estado_actual: 'Activo',
            id_usuario: 2,
            id_categoria: 2
        }
    });
    //id:3
    await prisma.producto.create({
        data: {
            nombre: 'Bad Omens',
            descripcion: 'Album: Unite And Fight',
            precio: '20000.00',
            cantidad: "15",
            estado_producto: 'Usado',
            estado_actual: 'Activo',
            id_usuario: 2,
            id_categoria: 2
        }
    });
    //id:4
    await prisma.producto.create({
        data: {
            nombre: 'Escape the Fate',
            descripcion: 'Album: Dying Is Your Latest Fashion',
            precio: '7000.00',
            cantidad: "20",
            estado_producto: 'Nuevo',
            estado_actual: 'Activo',
            id_usuario: 2,
            id_categoria: 3
        }
    });
    //id:5
    await prisma.producto.create({
        data: {
            nombre: 'Arch Enemy',
            descripcion: 'Album: Decivers',
            precio: '20000.00',
            cantidad: "20",
            estado_producto: 'Nuevo',
            estado_actual: 'Activo',
            id_usuario: 4,
            id_categoria: 3
        }
    });
    //id:6
    await prisma.producto.create({
        data: {
            nombre: 'SpiritBox',
            descripcion: 'Album: Eternal Blue',
            precio: '15000.00',
            cantidad: "12",
            estado_producto: 'Nuevo',
            estado_actual: 'Activo',
            id_usuario: 5,
            id_categoria: 3
        }
    });
    //id:7
    await prisma.producto.create({
        data: {
            nombre: 'Motionless In White',
            descripcion: 'Album: 10 Year Anniversary',
            precio: '20000.00',
            cantidad: "10",
            estado_producto: 'Nuevo',
            estado_actual: 'Activo',
            id_usuario: 4,
            id_categoria: 3
        }
    });
    //lineaDetalle
    //id:1 - All That Remains
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 2,
            sub_total: '20000.00',
            estado_actual: "Pagado",
            id_producto: 1,
            id_ordenCompra: 1
        }
    })
    //id:6 SpiritBox
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 1,
            sub_total: '20000.00',
            estado_actual: "Pagado",
            id_producto: 6,
            id_ordenCompra: 1
        }
    })
    //id:2
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 1,
            sub_total: '20000.00',
            estado_actual: "Pagado",
            id_producto: 2,
            id_ordenCompra: 3
        }
    })
    //id:3
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 2,
            sub_total: '40000.00',
            estado_actual: "Pagado",
            id_producto: 3,
            id_ordenCompra: 2
        }
    })
    //id:4
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 2,
            sub_total: '14000.00',
            estado_actual: "Pagado",
            id_producto: 4,
            id_ordenCompra: 4
        }
    })
    //id:5
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 3,
            sub_total: '60000.00',
            estado_actual: "Pendiente",
            id_producto: 5,
            id_ordenCompra: 5
        }
    })
    //id:6
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 1,
            sub_total: '15000.00',
            estado_actual: "Pagado",
            id_producto: 6,
            id_ordenCompra: 6
        }
    })
    //id:7
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 5,
            sub_total: '100000.00',
            estado_actual: "Pendiente",
            id_producto: 7,
            id_ordenCompra: 7
        }
    })
    //id:8
    await prisma.lineaDetalle.create({
        data: {
            cantidad: 2,
            sub_total: '20000.00',
            estado_actual: "Pagado",
            id_producto: 1,
            id_ordenCompra: 8
        }
    })
    //fotografia
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/DY2njSn/All-That-Remains.png',
            estado_actual: 'Activo',
            id_producto: 1
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/xYZ9vpC/All-That-Remains-Lista.jpg',
            estado_actual: 'Activo',
            id_producto: 1
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/qs7Xc6P/Motionless-in-White-Completo.jpg',
            estado_actual: 'Activo',
            id_producto: 2
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/820NLd6/Motionless-in-White-Lista.jpg',
            estado_actual: 'Activo',
            id_producto: 2
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/8mSQZjL/Motionless-in-White-Solo-Disco.jpg',
            estado_actual: 'Activo',
            id_producto: 2
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/6HPp7mN/Motionless-in-White-Vinillo-Representacion.jpg',
            estado_actual: 'Activo',
            id_producto: 2
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/84RdPpd/Bad-Omens.jpg',
            estado_actual: 'Activo',
            id_producto: 3
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/nw3bv5D/Escape-The-Fate.png',
            estado_actual: 'Activo',
            id_producto: 4
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/KNsdmb2/Arch-Enemy-Frontal.png',
            estado_actual: 'Activo',
            id_producto: 5
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/rvJ94Rn/Arch-Enemy-Varios-Discos.jpg',
            estado_actual: 'Activo',
            id_producto: 5
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/0tL36bb/Arch-Enemy-Juego.jpg',
            estado_actual: 'Activo',
            id_producto: 5
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/wrMkxHM/Spirit-Box.png',
            estado_actual: 'Activo',
            id_producto: 6
        }
    });
    await prisma.fotografia.create({
        data: {
            fotografia: 'https://i.ibb.co/NVVs5RV/Motionless-in-White-10-Anniversary.png',
            estado_actual: 'Activo',
            id_producto: 7
        }
    });
    //mensajeria
    await prisma.mensajeria.create({
        data: {
            asunto: "Precio de disco",
            mensaje: "Me gustaria saber el precio de este disco",
            respuesta: "Tiene un precio de 10.000 colones",
            estado_actual: "Pregunta respondida",
            id_producto: 1,
            id_usuario: 2
        }
    });
    await prisma.mensajeria.create({
        data: {
            asunto: "Envios desde la casa",
            mensaje: "Me gustaria saber si los prodecutos que vendes se pueden hacer por envios desde la casa",
            respuesta: "",
            estado_actual: "Pendiente",
            id_producto: 1,
            id_usuario: 4
        }
    });
    await prisma.mensajeria.create({
        data: {
            asunto: "Duda sobre el producto",
            mensaje: "Vi que algunas de las foto se puede ver el color que tiene ese albun, es cierto o es cuando esta al sol que se recalienta",
            respuesta: "Es cuando lo enseñas al sol, hace ese efecto",
            estado_actual: "Pregunta respondida",
            id_producto: 2,
            id_usuario: 2
        }
    });
    await prisma.mensajeria.create({
        data: {
            asunto: "Envios desde la casa",
            mensaje: "Me gustaria saber si los prodecutos que vendes se pueden hacer por envios desde la casa",
            respuesta: "",
            estado_actual: "Pendiente",
            id_producto: 5,
            id_usuario: 4
        }
    });
    await prisma.mensajeria.create({
        data: {
            asunto: "Duda de los articulos",
            mensaje: "Muy buenas, cada cuanto vienen sus productos?",
            respuesta: "Casi siempre viene el camion los lunes y jueves",
            estado_actual: "Pregunta respondida",
            id_producto: 6,
            id_usuario: 5
        }
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
