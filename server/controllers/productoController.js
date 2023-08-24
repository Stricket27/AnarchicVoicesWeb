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
          apellidos: true
        },
      },
      fotografia: {
        select: {
          id_fotografia: true,
          fotografia: true,
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
    },
  });
  response.json(newProducto);
};

//Actualizar
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  const { id_producto } = request.body;
  console.log(request.body);

  const newProducto = await prisma.producto.update({
    where: {
      id_producto: id_producto,
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
  response.json(newProducto);
};
