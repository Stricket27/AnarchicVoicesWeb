const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
   

const ordencompra = await prisma.$queryRaw`Select oc.*, ld.id_producto,ld.cantidad,ld.sub_total,p.nombre,p.descripcion,p.estado_producto
From ordenCompra as oc
Inner Join lineadetalle as ld on oc.id_ordenCompra = ld.id_ordenCompra
Inner Join producto as p on ld.id_producto = p.id_producto; 
`;

  response.json(ordencompra);
 
};




//Obtener por Id



module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const ordencompra = await prisma.ordenCompra.findUnique({
      where: { id_ordenCompra: id },
      include: {
        usuario: true,
        lineaDetalle: {
          select: {
            producto: true,
            cantidad:true,
            sub_total:true
          }
        }
      }
    });

    console.log(ordencompra);

    if (ordencompra && ordencompra.lineaDetalle) {
        ordencompra.lineaDetalle.forEach((detalle) => {
            console.log(detalle); // Accede a cada elemento de lineaDetalle
            console.log(detalle.id_producto); // Accede al ID de producto en cada elemento de lineaDetalle
        });
    }
    if (ordencompra && ordencompra.producto) {
      ordencompra.lineaDetalle.forEach((producto) => {
          console.log(producto); // Accede a cada elemento de lineaDetalle
          console.log(producto.id_producto); // Accede al ID de producto en cada elemento de lineaDetalle
      });
  }
    

    response.json(ordencompra);
};
//Crear una OrdenCompra
module.exports.create = async (request, response, next) => {
  let infoOrden = request.body;
  const newOrdenCompra = await prisma.ordenCompra.create({
    data: {
      fecha: infoOrden.fecha,
      usuario: { connect: { id_usuario: infoOrden.usuario } },
      lineaDetalle:{
        createMany:{
          //[{videojuegoId, cantidad}]
          data: infoOrden.lineaDetalle,    
        }
          
        },
        
      sub_total: infoOrden.sub_total,
      monto_total: infoOrden.monto_total,
      estado_actual: infoOrden.estado_actual,
      direccion: infoOrden.direccion,
      // id_usuario: ordenCompra.id_usuario,
      metodoPago: infoOrden.metodoPago,
     
    },
  });
  response.json(newOrdenCompra);
};
//Actualizar una OrdenCompra
module.exports.update = async (request, response, next) => {
  let ordenCompra = request.body;
  let idOrdenCompra = parseInt(request.params.id);
  //Obtener usuario viejo
  // const usuarioViejo = await prisma.usuario.findUnique({
  //   where: { id: idUsuario }
  // });

  const newOrdenCompra = await prisma.ordenCompra.update({
    where: {
      id: idOrdenCompra,
    },
    data: {
        fecha: ordenCompra.fecha,
        monto_total: ordenCompra.monto_total,
        estado_actual: ordenCompra.estado_actual,
        direccion: ordenCompra.direccion,
        id_usuario: ordenCompra.id_usuario,
        id_metodoPago: ordenCompra,id_metodoPago
    },
  });
  response.json(newOrdenCompra);
};
