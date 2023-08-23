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
          data: infoOrden.lineaDetalle  
        }
          
        },
       
      // sub_total: infoOrden.sub_total,
      monto_total: infoOrden.monto_total,
      estado_actual: infoOrden.estado_actual,
      direccion: infoOrden.direccion,
      // id_usuario: ordenCompra.id_usuario,
      metodoPago: infoOrden.id_metodoPago,
    },
  }); 
  // console.log("info"+infoOrden)
  response.json(newOrdenCompra);
};
//Actualizar una OrdenCompra
module.exports.update = async (request, response, next) => {
  let ordenCompra = request.body;
  let id = parseInt(request.params.id);

  const newOrdenC = await prisma.ordenCompra.update({
    where: {
      id_ordenCompra: id,
    },
    data: {
        direccion: ordenCompra.direccion,
       id_metodoPago: ordenCompra.id_metodoPago,
        // direccion: { connect: ordenCompra.id_direccion },
        // metodoPago: { connect: ordenCompra.id_metodoPago },

        // usuario: {connect: mensajeria.id_usuario  },
        // producto: {connect:  mensajeria.id_producto  }
        lineaDetalle: {
          updateMany: {
            where: {
              id_ordenCompra: id,
            },
            data: {
              estado_actual: "Pagado",
            },
          }
        }
    },
  });
  response.json(newOrdenC);
};


//DASHBOARD
module.exports.getVentaProductoMes = async (request, response, next) => {
  let mes = parseInt(request.params.mes);
  const result = await prisma.$queryRaw( 
    Prisma.sql`SELECT 
    p.nombre, SUM(ld.cantidad) AS suma
FROM
    ordencompra oc
        INNER JOIN
    lineadetalle ld ON oc.id_ordenCompra = ld.id_ordenCompra
        INNER JOIN
    producto p ON ld.id_producto = p.id_producto
WHERE
    MONTH(oc.fecha) = ${mes}
GROUP BY p.nombre`
  );
  
  response.json(result);
}; 

module.exports.getVentaProductoTop = async (request, response, next) => {
  const result = await prisma.$queryRaw( 
    Prisma.sql`SELECT p.nombre, SUM(ld.cantidad) AS total
    FROM ordencompra oc
    INNER JOIN lineadetalle ld ON oc.id_ordenCompra = ld.id_ordenCompra
    INNER JOIN producto p ON ld.id_producto = p.id_producto
    WHERE MONTH(oc.fecha) = 8
    GROUP BY p.nombre
    ORDER BY total DESC
    LIMIT 5;`
  )
  response.json(result)
};
