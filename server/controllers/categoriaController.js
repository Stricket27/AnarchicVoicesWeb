const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const categoria = await prisma.categoria.findMany({
    orderBy:{
      descripcion: 'asc'
    },
  });
  response.json(categoria);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const categoria=await prisma.categoria.findUnique({
        where: { id_categoria: id }
    })
    response.json(categoria);
};

//Crear 
module.exports.create = async (request, response, next) => {
  let categoria = request.body;
  const newCategoria = await prisma.categoria.create({
    data: {
        descripcion: categoria.descripcion,
        estado_actual: categoria.estado_actual
    },
  });
  response.json(newCategoria);
};

//Actualizar 
module.exports.update = async (request, response, next) => {
  let categoria = request.body;
  let idCategoria = parseInt(request.params.id);

  const newCategoria = await prisma.categoria.update({
    where: {
      id_categoria: idCategoria,
    },
    data: {
        descripcion: categoria.descripcion,
        estado_actual: categoria.estado_actual
    },
  });
  response.json(newCategoria);
};
