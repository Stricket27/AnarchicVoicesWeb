const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const producto = await prisma.producto.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(producto);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: { id_producto: id },
    include: {
      categoria: {
        select: {
          id_categoria: true,
          descripcion: true,
        },
      },
      usuario: {
        select: {
          id_usuario: true,
          nombre: true,
          apellidos: true,
        },
      },
      fotografia: {
        select: {
          id_fotografia: true,
          fotografia: true,
          estado_actual: true,
        },
        where: {
          estado_actual: "Activo",
        },
      },
      mensajeria: true,
    },
  });
  response.json(producto);
};

//Crear
module.exports.create = async (request, response, next) => {
  let producto = request.body;
  let fotografias = request.body.fotografias;
  // const {fotografias} = request.body
  const newProducto = await prisma.producto.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estado_producto: producto.estado_producto,
      estado_actual: producto.estado_actual,
      usuario: { connect: { id_usuario: producto.usuario } },
      categoria: { connect: { id_categoria: producto.categoria } },

      // fotografia: {
      //   createMany: {
      //     data: fotografias
      //   }
      // }
    },
  });

  if (fotografias) {
    if (fotografias.length > 0) {
      for (let i = 0; i < fotografias.length; i++) {
        await prisma.fotografia.create({
          data: {
            id_producto: newProducto.id_producto,
            fotografia: request.body.fotografias[i].split(",")[i],
          },
        });
      }
    }
  }

  response.json(newProducto);
};

//Actualizar
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  const { fotografias } = request.body;

  let idProducto = producto.id_producto;
  //Obtener producto viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id_producto: idProducto },
    include: {
      categoria: {
        select: {
          id_categoria: true,
        },
      },
      usuario: {
        select: {
          id_usuario: true,
        },
      },
      fotografia: {
        select: {
          id_fotografia: true,
          fotografia: true,
        },
      },
    },
  });
  console.log(productoViejo);
  const oldFotografias = productoViejo.fotografia;
  const eliminarFotografia = oldFotografias.filter((fotografia) => {
    return !fotografias.some(
      (imagen) => imagen.fotografia == fotografia.fotografia
    );
  });
  const newProducto = await prisma.producto.update({
    where: {
      id_producto: idProducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estado_producto: producto.estado_producto,
      estado_actual: producto.estado_actual,
      usuario: { connect: { id_usuario: producto.usuario } },
      categoria: { connect: { id_categoria: producto.categoria } },
    },
  });
  await Promise.all(
    eliminarFotografia.map((foto) => {
      return prisma.fotografia.update({
        where: {
          id_fotografia: foto.id_fotografia,
        },
        data: {
          estado_actual: "inactivo",
        },
      });
    })
  );
  response.json(newProducto);
};
