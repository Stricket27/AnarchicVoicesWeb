const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const producto = await prisma.producto.findMany({
    orderBy:{
      nombre: 'asc'
    }
  });
  response.json(producto)
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const producto=await prisma.producto.findUnique({
        where: { id_producto: id },
        include: {
          categoria:{
            select:{
              descripcion: true
            }
          },
          usuario: {
            select:{
              nombre: true,
              apellidos: true
            }
          },
          fotografia: 
          {
            select:{
              id_producto: true,
              fotografia: true
            }
          },
          mensajeria: true
        }
    })
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
        id_usuario: producto.id_usuario,
        id_categoria: id_categoria
    },
  });
  response.json(newProducto);
};
//Actualizar 
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  //Obtener producto viejo
    const productoViejo = await prisma.producto.findUnique({
      where: { id_producto: idProducto }
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
        id_usuario: producto.id_usuario,
        id_categoria: id_categoria
    },
  });
  response.json(newProducto);
};
